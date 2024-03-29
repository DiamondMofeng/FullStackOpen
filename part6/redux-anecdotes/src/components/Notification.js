import { connect } from "react-redux"

const Notification = (props) => {
  const notification = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <>
      {notification === ""
        ? null
        :
        <div style={style}>
          {notification}
        </div>}

    </>
  )
}

//* Below are codes for the "connect" function

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification