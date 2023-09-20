function ListCard({ title, button, dropdownContent, cardlayout }) {
  return (
    <div className='mt-1 card bg-dark text-white'>
      <div className='card-body'>
        <div className={ cardlayout }>
          <h5 className='mx-auto my-auto'>{ title }</h5>
          { button }
          { dropdownContent }
        </div>
      </div>
    </div>
  )
}

export default ListCard
