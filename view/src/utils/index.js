
const baseUrl = "http://localhost:3000";

export const getProducts = async () =>{
    try{
        const res = await fetch(`${baseUrl}/products`,{
            headers:{
                method: 'GET',
            }
        });
       return res.json();
    } catch (error) {
        return { error }
    }
}