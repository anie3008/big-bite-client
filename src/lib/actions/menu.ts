

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"


export const createMenu = async (data:Record<string, unknown>) => {
    const res = await fetch(`${BASE_URL}/menu`,{
        method: "POST",
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
  throw new Error("Failed to create menu item");
}
    return res.json()
}