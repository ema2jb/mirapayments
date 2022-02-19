import cardItemStyles from './CardItem.module.css'

const CardItem = ({items, deletePost, updatePost}) => {

  

  return (
    <div>
        {items.map(item=>(
                <div key={item.id} className={cardItemStyles.cardItem}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <div className="actions">
                        <button onClick={()=>updatePost(item)} type="button">UPDATE</button>
                        <button
                        onClick={()=>deletePost(item.id)} 
                        className={cardItemStyles.delete} 
                        type="button">
                          DELETE
                        </button>
                    </div>
                </div>
            ))}
    </div>
  )
}

export default CardItem