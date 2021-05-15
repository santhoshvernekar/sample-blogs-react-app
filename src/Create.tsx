import { useState } from "react";
import {useHistory} from "react-router-dom";

 
const Create= () => {
    const [title,setTitle]=useState('');
    const [body,setBody]=useState('');
    const[author,setAuthor]=useState('san');
    const[isPending, setisPending]=useState(false);
    const history = useHistory();

    const handleSubmit=(e)=>{
        e.preventDefault();
        const blog={title,body,author};
        setisPending(true);
        fetch('http://localhost:8000/blogs',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(blog)
        }).then(()=>{
            console.log('new blog added');
            setisPending(false);
            history.push('/');
        })
        
    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title: </label>
                <input type="text"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                required
                />
                 <label>Blog body: </label>
                <textarea 
                required
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                ></textarea>
                <label>Blog Author:</label>
                <select value={author} onChange={(e)=>setAuthor(e.target.value)}>
                    <option value="san">san</option>
                    <option value="vernekar">vernekar</option>
                </select>
              {!isPending && <button>Add Blog</button>}  
              {isPending && <button disabled>Add Blog</button>}  
            </form>
        </div>
      );
}
 
export default Create;