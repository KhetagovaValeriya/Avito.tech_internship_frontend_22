import {useState, useEffect} from 'react';
import {format} from 'date-fns';



function News() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  

  useEffect(() => {
    setIsLoading(true)
    const fetchArticles = async () => { 
        const res = await fetch(`http://hn.algolia.com/api/v1/search_by_date?tags=story`)
        const data = await res.json()
        setItems(data.hits);
           
    }

    fetchArticles()
    setIsLoading(false)

   
    
  })

  return (
    <section className="section">
      
      <article className="title">
          <h1>Hacker News</h1>
          <a href='localhost:3000'>Home</a>  
      </article> 
      
      {isLoading ? (
      <div className='loading'></div> 
      ) : ( 
        <>
          <article className="cards">
            {items.map(({ author, created_at, title, url, objectId, points, comment }) =>
                <div key={objectId}>
                  <h2>Title {title}</h2>
                  <ul>
                    <li>By {author}</li>
                    <li><a href={url} target='_blank' rel='noreferrer'>Read more</a></li>
                  </ul>
                  <p>Points: {points}</p>
                  <p>Date{format(new Date(created_at), "dd MMMM yyyy")}</p>
                  <form> 
                    <button>Update comments</button>
                    <a class='button' href='localhost:3000/news' onClick="location.reload(); return false;"></a>
                  </form>
                  <p>Commets: {comment}</p>
                </div>
              )}
           
          </article>

         

         
        </>)}
     
    </section>
    
    
  );
}
export default News;
