import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';

import { Container, Button, Row } from 'react-bootstrap'
import axios from 'axios'
/* import Chart from "react-apexcharts"; */
const ChartComponent = dynamic(
  () => import('../../modules/Chart/ChartComponent'),
  { ssr: false }
);

const preciosInternacionales = () => {
  const [data, setData] = useState([]);
  /* const [prices, setPrices] = useState([]); */

  useEffect(() => {
    getTimeSeriesRatesGoldSilver();
  }, [])

  useEffect(() => {
    console.log("data:", data.length)
  }, [data])

  const getLatestRatesGoldSilver = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_METALS_API}latest?access_key=${process.env.NEXT_PUBLIC_ACCESS_KEY}&base=USD&symbols=XAU,XAU-BID,XAU-ASK`);
    console.log("RESPONSE: ", response.data);
  }

  const getTimeSeriesRatesGoldSilver = async () => {
    let data = [];

    const response2 = await axios.get(`${process.env.NEXT_PUBLIC_METALS_API}timeseries?access_key=${process.env.NEXT_PUBLIC_ACCESS_KEY}&start_date=2023-06-12&end_date=2023-07-11&base=USD&symbols=XAU-BID`);
    console.log("RESPONSE TIME SERIES: ", response2.data.rates);

    for (const [key, value] of Object.entries(response2.data.rates)) {
      console.log(`${key}: ${value["XAU-BID"]}`);

      data.push({ x: key, y: 1 / value["XAU-BID"] });
    }
    setData([...data]);
  }

  const handleObtenerPrecio = () => {
    getLatestRatesGoldSilver();
  }
  return (
    <Container>
      <h1>Precios Internacionales</h1>
      <Button className="mt-3" onClick={handleObtenerPrecio}>Obtener precio del oro</Button>

      <h2>Último precio bid ($/oz) del día anterior</h2>
      <Row className="g-0">
        <div className="mixed-chart">
          <ChartComponent data={data} />
        </div>
      </Row>

      <Row className="g-0">
        {/* <a href="http://www.kitco.com/connecting.html">
          <img src="http://www.kitconet.com/charts/metals/gold/t24_au_en_usoz_2.gif" border="0" alt="[Most Recent Quotes from www.kitco.com]" />
        </a> */}
        <a href="http://www.kitco.com/connecting.html">
          <img src="http://www.kitco.com/LFgif/au0030lnb.gif" border="0" alt="[Most Recent Quotes from www.kitco.com]" />
        </a>


      </Row>
    </Container>
  )
}

export default preciosInternacionales