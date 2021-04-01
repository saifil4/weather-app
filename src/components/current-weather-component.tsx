import React from 'react';
import { CurrentWeather } from '../interfaces/current-weather'
import { Container, Row, Col } from 'react-bootstrap';
interface Props {
    data: CurrentWeather | undefined
}

const CurrentWeatherComponent: React.FC<Props> = ({ data }) => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        {
                            data
                                ?
                                <div className="today-container">
                                    <p>{data.Date}</p>
                                    <h1 className="temperature">
                                        <img alt={data.Description} width="100px" src={`http://openweathermap.org/img/wn/${data.Icon}@2x.png`} />
                                        <span>{data.Temp}<sup>o</sup> C</span>
                                    </h1>
                                    <p>Feels like {data.FeelsLike}<sup>o</sup>C</p>
                                    {/* <h2 className="city-name">City</h2> */}
                                </div>
                                :
                                <div>Loading</div>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CurrentWeatherComponent;