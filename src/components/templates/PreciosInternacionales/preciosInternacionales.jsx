import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';

import { Container, Button, Row } from 'react-bootstrap'
import axios from 'axios'
import styles from './preciosInternacionales.module.scss'
import useFormatnumber from '@/hooks/useFormatNumber';
/* import Chart from "react-apexcharts"; */
const ChartComponent = dynamic(
  () => import('../../modules/Chart/ChartComponent'),
  { ssr: false }
);

const preciosInternacionales = () => {
  const [data, setData] = useState([]);
  const [priceSpot, setPriceSpot] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);


  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const baseDateWithOffset = Date.now() - tzoffset;
  const todayISO = new Date(baseDateWithOffset).toISOString().substring(0, 10);
  const today = new Date();
  const subtractionMonth = new Date(baseDateWithOffset).setDate(new Date(baseDateWithOffset).getDate() - 30);
  const subtractionDay = new Date(baseDateWithOffset).setDate(new Date(baseDateWithOffset).getDate() - 1);



  const yesterday = new Date(subtractionDay).toISOString().substring(0, 10);
  /* const [prices, setPrices] = useState([]); */

  useEffect(() => {
    getTimeSeriesRatesGoldSilver();
    getLatestRatesGoldSilver();
    /* console.log("today: ", today)
    console.log("day: ", today.getDay())
    console.log("hour: ", today.getHours())
    console.log("minutes: ", today.getMinutes()) */

  }, [])

  const getLatestRatesGoldSilver = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_METALS_API}latest?access_key=${process.env.NEXT_PUBLIC_ACCESS_KEY}&base=USD&symbols=XAU-BID`);
    const response3 = await axios.get(`${process.env.NEXT_PUBLIC_METALS_API}lowest-highest/${todayISO}?access_key=${process.env.NEXT_PUBLIC_ACCESS_KEY}&base=USD&symbols=XAU-BID`);

    setPriceSpot(response.data.rates["USDXAU-BID"]);
    setLowPrice(1 / response3.data.rates.low);
  }

  const getTimeSeriesRatesGoldSilver = async () => {
    let data = [];
    const oneMonthBack = new Date(subtractionMonth).toISOString().substring(0, 10);
    const response2 = await axios.get(`${process.env.NEXT_PUBLIC_METALS_API}timeseries?access_key=${process.env.NEXT_PUBLIC_ACCESS_KEY}&start_date=${oneMonthBack}&end_date=${yesterday}&base=USD&symbols=XAU-BID`);

    for (const [key, value] of Object.entries(response2.data.rates)) {
      /* console.log(`${key}: ${value["XAU-BID"]}`); */
      data.push({ x: key, y: 1 / value["XAU-BID"] });
    }
    setData([...data]);
  }

  /* const handleObtenerPrecio = () => {
    getLatestRatesGoldSilver();
  } */
  return (
    <Container className={styles.mainContainer + " g-0 d-flex flex-column flex-md-row"}>
      {/* <h3>Precios Internacionales</h3> */}

      <div>
        <h4 className="mb-4">Último precio bid spot y low (tiempo real)</h4>
        {/* <Button className="mt-3" onClick={handleObtenerPrecio}>Obtener precio del oro</Button> */}

        <div className={styles.containerPrecioSpot}>
          <div className="d-flex flex-column align-items-center align-items-md-stretch">
            {
              priceSpot !== 0
                ?
                <p className="text-white"><span className="fw-bold">Precio BID spot ($/oz t):</span> {useFormatnumber(parseFloat((priceSpot.toString()).slice(0, ((priceSpot.toString()).indexOf(".")) + 3).toLocaleString()))}</p>

                :
                null
            }

            {
              lowPrice !== 0
                ?
                <p className="text-white"><span className="fw-bold">Precio low ($/oz t):</span> {useFormatnumber(parseFloat((lowPrice.toString()).slice(0, ((lowPrice.toString()).indexOf(".")) + 3).toLocaleString()))}</p>

                :
                null
            }
          </div>
          <div className="d-flex flex-column align-items-center align-items-md-stretch">
            {
              // Para hora peruana sería 16 (5pm) para el día domingo y para ET sería 17 (6pm)
              // Para hora peruana sería 15 (4pm) para el día viernes y para ET sería 16 (5pm)
              (today.getDay() === 5 && today.getHours() >= 16) || (today.getDay() === 6) || (today.getDay() === 0 && today.getHours() <= 17) || (today.getHours() === 16 || today.getHours() === 17)
                ?
                <>
                  <p className="text-danger fw-bold">Mercado cerrado</p>

                  {
                    today.getDay() === 5
                      ?
                      <p className="text-white">
                        <span className="fw-bold">El mercado abrirá en:</span> {`${65 - today.getHours()} hrs. ${60 - today.getMinutes()} mins.`}</p>
                      :
                      today.getDay() === 6
                        ?
                        <p className="text-white">
                          <span className="fw-bold">El mercado abrirá en:</span> {`${40 - today.getHours()} hrs. ${60 - today.getMinutes()} mins.`}</p>
                        :
                        today.getDay() === 0
                          ?
                          <p className="text-white">
                            <span className="fw-bold">El mercado abrirá en:</span> {`${17 - today.getHours()} hrs. ${60 - today.getMinutes()} mins.`}</p>
                          :
                          null
                  }

                </>
                :
                <p className="text-success fw-bold">Mercado abierto</p>
            }
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div className="mb-3 mb-md-5">
          <h4 className="mb-2">Último precio bid ($/oz t) del día anterior (ALR)</h4>
          <Row className="g-0">
            <div className="mixed-chart">
              <ChartComponent data={data} />
            </div>
          </Row>
        </div>

        <Row className="g-0">
          {/* <a href="http://www.kitco.com/connecting.html">
          <img src="http://www.kitconet.com/charts/metals/gold/t24_au_en_usoz_2.gif" border="0" alt="[Most Recent Quotes from www.kitco.com]" />
        </a> */}
          <h4 className="mb-3">Último precio bid ($/oz t) (KITCO)</h4>
          <a href="http://www.kitco.com/connecting.html">
            <img className={styles.kitcoChart} src="http://www.kitco.com/LFgif/au0030lnb.gif" border="0" alt="[Most Recent Quotes from www.kitco.com]" />
          </a>


        </Row>
      </div>

    </Container >
  )
}

export default preciosInternacionales