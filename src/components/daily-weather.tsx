import React from 'react';
import { DailyWeather } from '../interfaces/daily-weather'
import { Table, Container, Row, Col } from 'react-bootstrap';

interface Props {
    data: Array<DailyWeather> | undefined
}

const DailyWeatherComponent: React.FC<Props> = ({ data }) => {
    return (
        <>
            <Container>
                <Row>
                    <Col md={3}></Col>
                    <Col md={6}>
                        {
                            data ?
                                <div className="weekly-container">
                                    <Table style={{ color: 'white' }}>
                                        <tbody>
                                            {data.map((day) => (
                                                <tr>
                                                    <td>
                                                        {day.Day}
                                                    </td>
                                                    <td>
                                                        <img alt={day.Description} width="50px" src={`http://openweathermap.org/img/wn/${day.Icon}@2x.png`} />
                                                        <span>{day.Description}</span>
                                                    </td>
                                                    <td>
                                                        <span>{day.MinTemp}<sup>o </sup></span>
                                                        <span>{day.MaxTemp}<sup>o</sup></span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                                :
                                <div>Loading</div>
                        }
                    </Col>
                    <Col md={3}></Col>
                </Row>
            </Container>

        </>
    )
}

export default DailyWeatherComponent;