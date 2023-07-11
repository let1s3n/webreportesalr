import Tab from 'react-bootstrap/Tab';
const tab = ({ title, eventKey, children }) => {
  return (
    <Tab eventKey={eventKey} title={title}>
      {children}

    </Tab>
  )
}

export default tab