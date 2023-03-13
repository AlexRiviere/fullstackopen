const Course = ({course}) => {
  
  const getTotal = () => {
    return course.parts.reduce((acc, part) => { 
      return acc + part.exercises;
    }, 0)
  }
  
  return (
    <div>
      <h2>{course.name}</h2>
      <ul>
        {course.parts.map(part => 
          <li key={part.id}>{part.name} {part.exercises}</li>
        )}
      </ul>
      <strong>total of {getTotal()} exercises</strong>
    </div>  
  )
}

export default Course