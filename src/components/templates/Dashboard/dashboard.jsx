import React from 'react'
import { Container } from 'react-bootstrap';

const dashboard = ({ graphData }) => {
  return (
    <Container className="g-0">
      {
        (graphData.value).map(item => {
          return (
            <div key={item.id}>
              {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
              <iframe title="prod" width="100%" height="600" src={item.embedUrl + "&autoAuth=true&ctid=a4c27131-7f34-4498-90d7-6efea8bb3ef7"} frameBorder="0" allowFullScreen={true}></iframe>
            </div>
          )
        })
      
      }
    </Container>
  )
}

export default dashboard