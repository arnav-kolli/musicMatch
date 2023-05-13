export async function crudCreatePost(data) {
    
    try{
      await fetch(`/create`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
<<<<<<< HEAD
=======
      console.log("create") //crud console.log tests
>>>>>>> c7779dd4b47b8321fc22449aad2f9b597635f113
    } catch (err){
      console.log(err)
    }
  
  }
  
  export async function crudReadAllPosts() {
    try {
      const response = await fetch(`/readAll`, {
        method: 'GET',
      });
      let ret = await response.json();
      return ret
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function crudUpdatePost(id, data) {
    try{
      await fetch(`/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function deleteCounter(id) {
    try{
      const response = await fetch(`/delete`, {
        method: 'DELETE',
        body: JSON.stringify({id: id})
      });
    } catch (err) {
      console.log(err);
    }
  }
  