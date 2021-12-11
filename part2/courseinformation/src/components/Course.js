const Course = ({ courses }) => {

    return courses.map(course =>
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Statistic parts={course.parts} />
        </div>
    )
}



const Header = ({ name }) => {

    return <h2>{name}</h2>
}

const Content = ({ parts }) => {

    return (
        <div>
            {parts.map(part =>
                <Part part={part} />)
            }
        </div>
    )
}

const Part = ({ part }) => {

    return (
        <div>
            <p>
                {part.name} {part.exercises}
            </p>
        </div>
    )
}

const Statistic = ({ parts }) => {
    //console.log(parts)
    const exes = parts.map(part => part.exercises)
    //console.log("test",exes)
    const sumReducer = (pre, current) => {
        return pre + current
    }
    const total = exes.reduce(sumReducer)

    return (
        <div>
            <p><b>total of {total} exercises</b></p>
            {console.log(total)}
        </div>
    )
}
  
export default Course