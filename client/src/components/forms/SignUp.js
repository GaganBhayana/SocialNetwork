import React from 'react';
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Fa,
  Card,
  CardImage,
  CardBody
} from 'mdbreact';

import classes from './SignUp.css'

class FormsPage extends React.Component {
  render() {
    return (
    <Container>
      <Row>
        <Col sm="8" md="6" lg="4" style={{margin: 'auto'}}>
          <Card className={`mx-auto ${classes.Card}`}>
            <div className={classes.CardHeader}>
              <p className={classes.CardTitle}>Sign up</p>
            </div>
            <CardBody className={classes.CardBody}>
              <form>
                <div className="grey-text">
                  <Input label="Your name"  group="group" type="text" validate="validate" error="wrong" success="right"/>
                  <Input label="Your email"  group="group" type="email" validate="validate" error="wrong" success="right"/>
                  <Input label="Your password" group="group" type="password" validate="validate"/>
                </div>
                <div className="text-center py-4 mt-3">
                  <Button className={classes.CardButton} color="cyan" type="submit">Register</Button>
                </div>
              </form>
              <div className="d-flex justify-content-end">
                <p className="font-small grey-text mt-3">Already Registered? <a href="#" className="dark-grey-text ml-1 font-weight-bold"> Log In</a></p>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>);
  }
};

export default FormsPage;
