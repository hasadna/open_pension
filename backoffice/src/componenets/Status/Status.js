import "./Status.scss"

export default ({status, children}) => <span className='status-wrapper'>
  <i className={`dot ${status}`}> </i> <span className='text'>{children}</span>
</span>
