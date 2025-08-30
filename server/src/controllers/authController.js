import supabase from "../config/supabase.js";

// signup for doctors
export const signupDoctor = async (req, res) => {
    const { email, password, full_name, mob_no } = req.body;

    try {
        // Create user in supabase for authentication
        const { data: user, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { role: 'Doctor' },
        });

            if (authError) {
                const msg = (authError.message || '').toLowerCase();
                if (msg.includes('fetch failed') || msg.includes('timeout') || msg.includes('und_err_connect_timeout')) {
                    console.error('Supabase auth network error:', authError);
                    return res.status(503).json({ error: 'Authentication service is unreachable. Please try again later.' });
                }
                return res.status(400).json({ error: authError.message });
            }

        // insert additional user details into the table
        const userId = user?.user?.id;
        if (!userId) return res.status(500).json({ error: "User ID not found" });

        const { error: insertError } = await supabase.from('Doctors').insert([
            { id: user.user.id, email, full_name, mob_no }
        ]);
        if (insertError) {
            return res.status(400).json({ error: insertError.message });
        }

        // return success response
        return res.status(201).json({ message: "Doctor registered successfully", user });
    } catch (error) {
        console.error("Unexpected error during signup: ", error);
        return res.status(500).json({ error: "Internal server error " });
    }
};

// signup for patients
export const signupPatient = async (req, res) => {
    const { email, full_name, mob_no, password } = req.body;

    try {
        // Create patient in supabase for authentication
        const { data: user, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { role: 'Patient' },
        });

        if (authError) {
            return res.status(400).json({ error: authError.message });
        }

        // insert additional patient details into the table
        const userId = user?.user?.id;
        if (!userId) return res.status(500).json({ error: "User ID not found" });

        const { error: insertError } = await supabase.from('Patients').insert([
            { id: user.user.id, full_name, email, mob_no }
        ]);

        if (insertError) {
            return res.status(400).json({ error: insertError.message });
        }

        //  return success response
        return res.status(201).json({ message: "Patient registered successfully", user });
    } catch (error) {
        console.error("Unexpected error during signup: ", error);
        return res.status(500).json({ error: "Internal server error " });
    }
};

// Login for both doctors and patients
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
    try {
        // Authenticate user with supabase
        const { data: signInData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            return res.status(400).json({ error: authError.message });
        }

        // Fetch user details :
        const user = signInData?.user;
        const session = signInData?.session;

        if (!user || !session) {
            return res.status(500).json({ error: "Unexpected error: User or session data missing." });
        }

        // fetch role from user metadata
        let role = user?.user_metadata?.role || null;

        const table_map = { Doctor: 'Doctors', Patient: 'Patients' };
        const tableName = table_map[role];

        const { data, error } = await supabase.from(tableName).select('*').eq('id', user.id).single();

        if (error) {
            return res.status(400).json({
                message: "Login failed, user not found in the database.",
                error: error.message,
                user: { id: user.id, email: user.email, role }
            });
        }

        // return success response with user details and session
        return res.status(200).json({
            message: "Login successful",
            role,
            user: { id: user.id, email: user.email },
            session: {
                access_token: session.access_token,
                refresh_token: session.refresh_token,
                expires_at: session.expires_at,
            },
            profile: data,
        });
    } catch (error) {
        // Surface clearer message for connection timeouts to Supabase
        const causeCode = error?.cause?.code || error?.code;
        if (causeCode === 'UND_ERR_CONNECT_TIMEOUT') {
            console.error('Supabase auth timeout:', error);
            return res.status(503).json({ error: 'Authentication service is unreachable. Please try again later.' });
        }
        console.error("Unexpected error during login: ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Get current user from Bearer token
export const me = async (req, res) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
        if (!token) {
            return res.status(401).json({ error: 'Missing or invalid Authorization header' });
        }

        const { data, error } = await supabase.auth.getUser(token);
        if (error || !data?.user) {
            return res.status(401).json({ error: error?.message || 'Invalid or expired token' });
        }

        const user = data.user;
        const role = user?.user_metadata?.role || null;
        let profile = null;
        if (role === 'Doctor') {
            const { data: prof, error: perr } = await supabase.from('Doctors').select('*').eq('id', user.id).single();
            if (!perr) profile = prof;
        } else if (role === 'Patient') {
            const { data: prof, error: perr } = await supabase.from('Patients').select('*').eq('id', user.id).single();
            if (!perr) profile = prof;
        }

        return res.status(200).json({ message: 'Session valid', role, user: { id: user.id, email: user.email }, profile });
    } catch (error) {
        console.error('Unexpected error during me:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Logout placeholder (JWT-based)
export const logout = async (_req, res) => {
    return res.status(200).json({ message: 'Logged out' });
};

