export async function crudCreatePost(data) {
    await fetch(`/create`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  export async function crudReadAllPosts() {
    try {
      console.log("in crud")
      const response = await fetch(`/readAll`, {
        method: 'GET',
      });
      let ret = await response.json();
      return ret
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function crudUpdatePost(data) {
    // TODO #5: Complete the updateCounter function
    try{
      const response = await fetch(`/update`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function deleteCounter(id) {
    // TODO #6: Complete the deleteCounter function
    try{
      const response = await fetch(`/delete`, {
        method: 'DELETE',
        body: JSON.stringify({id: id})
      });
    } catch (err) {
      console.log(err);
    }
  }
  