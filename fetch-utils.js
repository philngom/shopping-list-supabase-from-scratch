const SUPABASE_URL = 'https://crsgyrlryxmzhinadeuz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTUxMzUyNCwiZXhwIjoxOTU3MDg5NTI0fQ.Etnqrb1fKV_nAVCWR-RclX41WLHFVSn-bKuV7MYotEk';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../');
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./list');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

export async function getItems() {
    const response = await client
        .from('todos')
        .select();

    return checkError(response);
}

export async function deleteAllItems() {
    const response = await client
        .from('todos')
        .delete();

    return checkError(response);
}

export async function buyItem(id, bool) {
    const response = await client
        .from('todos')
        .update({
            complete: bool
        })
        .match({ id: id });

    return checkError(response);
}

export async function createItem(item) {
    const response = await client
        .from('todos')
        .insert([{
            todo: item,
        }]);

    return checkError(response);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
