import {useState, useEffect} from 'react';
import {format} from 'date-fns';
import { BrowserRouter as Routes, Route } from 'react-router-dom';



function App() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [location] = useState(0)


  useEffect(() => {
    setIsLoading(true)
    const fetchArticles = async () => { 
        const res = await fetch(`http://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=100`)
        const data = await res.json()
        setItems(data.hits);
           
    }

    fetchArticles()
    setIsLoading(false)

    const time = setInterval(() => {
      window.location.reload()
    }, 60000);
    
  })

  return (
    <section className="section">
      
      <article className="title">
          <h1>Hacker News</h1>
      </article>

      <form> 
        <button>Update news</button>
        <a class='button' href='localhost:3000' onClick="location.reload(); return false;"></a>
      </form>
      
      
      {isLoading ? (
      <div className='loading'></div> 
      ) : ( 
        <>
          <a className="cards" href='localhost:3000/news'>
            {items.map(({ author, created_at, title, url, objectId, points }) =>
              <div key={objectId}>
                <h2>{title}</h2>
                <ul>
                  <li>By {author}</li>
                  
                </ul>
                <p>Points: {points}</p>
                <p>{format(new Date(created_at), "dd MMMM yyyy")}</p>
              </div>
            )}
           
          </a>

          
          

         
        </>)}
     
    </section>
    
    
  );
}

export default App;
