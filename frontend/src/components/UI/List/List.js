import './list.css'

function List(props) {
  return (
    <div className='container py-5'>
      <h2 className='text-center text-white'>{ props.title }</h2>
      <div className='card-columns'>
        { props.children }
      </div>
    </div>
  )
}

export default List
