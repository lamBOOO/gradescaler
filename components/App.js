import React, { Component, useState, useRef, createRef } from 'react'
import { NextSeo } from 'next-seo';
import { Line, Bar } from 'react-chartjs-2';

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import Popover from 'react-bootstrap/Popover';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import 'bootstrap/dist/css/bootstrap.min.css';

const AmazonAffiliateData = [
  {
    link: "https://www.amazon.de/dp/B01HDNUXBW?&linkCode=ll1&tag=gradescaler-21&linkId=9a7ff66540ed90e55e70bd7448a90778&language=de_DE&ref_=as_li_ss_tl",
    imlink: "//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01HDNUXBW&Format=_SL250_&ID=AsinImage&MarketPlace=DE&ServiceVersion=20070822&WS=1&tag=&language=de_DE",
    title: "Hagomoro Chalk",
    bullets: [
      "made in Japan",
      "no dust",
      "less friction",
    ]
  },
  {
    link: "https://www.amazon.de/Logitech-Wireless-Presenter-Cordless-Timer/dp/B002L3TSLQ?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=lehrer&qid=1628170061&sr=8-33&linkCode=ll1&tag=gradescaler-21&linkId=b3a4a7a9f83221ed0e9211e832ce22e0&language=de_DE&ref_=as_li_ss_tl",
    imlink: "//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B002L3TSLQ&Format=_SL250_&ID=AsinImage&MarketPlace=DE&ServiceVersion=20070822&WS=1&tag=gradescaler-21&language=de_DE",
    title: "Logitech R400 Presenter",
    bullets: [
      "absolute must have",
      "only 12€"
    ]
  },
  {
    link: "https://www.amazon.de/Bose-Noise-Cancelling-Headphones-Schwarz/dp/B07Q9MJKBV?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=bose+g700&qid=1628170522&sr=8-5&linkCode=ll1&tag=gradescaler-21&linkId=ba3f083d6bb4ab0ce4020cb2495d7876&language=de_DE&ref_=as_li_ss_tl",
    imlink: "//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07Q9MJKBV&Format=_SL250_&ID=AsinImage&MarketPlace=DE&ServiceVersion=20070822&WS=1&tag=gradescaler-21&language=de_DE",
    title: "Bose Noise Cancelling Headphones 700",
    bullets: [
      "work everywhere",
      "noise cancelling",
      "best audio qual.",
    ]
  },
  {
    link: "https://www.amazon.de/Dell-S2721QS-Zoll-curved-entspiegelt/dp/B08FRJ9RJ9?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=27+4k&qid=1628170292&sr=8-9&linkCode=ll1&tag=gradescaler-21&linkId=a081f7b1aea61837d1d9d82858ca9771&language=de_DE&ref_=as_li_ss_tl",
    imlink: "//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B08FRJ9RJ9&Format=_SL250_&ID=AsinImage&MarketPlace=DE&ServiceVersion=20070822&WS=1&tag=gradescaler-21&language=de_DE",
    title: "Dell S2721QS 27 Zoll 4K UHD",
    bullets: [
      "27 inch allow multiple documents dide-by-side",
      "4K is crispy clear w.o. the need to zoom",
    ]
  },
  {
    link: "https://www.amazon.de/gp/product/B07L5GDTYY/ref=as_li_tl?ie=UTF8&tag=gradescaler-21&camp=1638&creative=6742&linkCode=as2&creativeASIN=B07L5GDTYY&linkId=4d7cb619629ee981e5d8900478a97050",
    imlink: "//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07L5GDTYY&Format=_SL250_&ID=AsinImage&MarketPlace=DE&ServiceVersion=20070822&WS=1&tag=gradescaler-21&language=de_DE",
    title: "Kindle Oasis",
    bullets: [
      "read you papers everywhere",
      "handy backlight for bed",
    ]
  },
  {
    link: "https://www.amazon.de/Rodcraft-8951000388-Rangierwagenheber-5T-RH216-Nachfolgemodell/dp/B08QRX6SVQ?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3QW6UMW0L8N2J&dchild=1&keywords=wagenheber&qid=1635594929&qsid=257-5642188-9022725&refinements=p_76%3A419122031&rnid=419121031&rps=1&sprefix=wagenhebe%2Caps%2C102&sr=8-8&sres=B002B552F0%2CB00FC2UVRS%2CB075DCMVZK%2CB08QRX6SVQ%2CB0086Q7K9O%2CB001B44QPE%2CB093DBVG5Y%2CB00VV047C0%2CB07H8Y6PDS%2CB07Y3VJ857%2CB07FPC7YP3%2CB086QHCK9P%2CB07P2WTKXF%2CB01N8RK8AA%2CB000XQ82YW%2CB08N6KBFYG%2CB0018ZB8RK%2CB078HHPJNQ%2CB093DDZ6QT%2CB01J1QGN54&srpt=UTILITY_JACK&linkCode=li2&tag=gradescaler-21&linkId=bc3057b131db037c62a46c441c401f63&language=de_DE&ref_=as_li_ss_il",
    imlink: "//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B08QRX6SVQ&Format=_SL160_&ID=AsinImage&MarketPlace=DE&ServiceVersion=20070822&WS=1&tag=gradescaler-21&language=de_DE",
    title: "Rodcraft Rangierwagenheber",
    bullets: [
      "For for all cars",
    ]
  },
  {
    link: "https://www.amazon.de/Steckschl%C3%BCsseleinsatz-Vierkantantrieb-Kunststoffh%C3%BClse-Schutz-Schl%C3%BCsselweite/dp/B001C9X03M?dchild=1&keywords=schlagschrauber+17+nuss&qid=1635594744&qsid=257-5642188-9022725&sprefix=schlagschrauber+17%2Caps%2C127&sr=8-16&sres=B000VR7VMC%2CB01FFMN0O0%2CB09FP8PKD1%2CB082WSF9W6%2CB0037J4PQ6%2CB07CN5HM43%2CB071XBXDBL%2CB0024EG66C%2CB01M5H2YZK%2CB07Q3S2T8V%2CB01KG2E3NQ%2CB001C9X03M%2CB01FFFXWBI%2CB01N3C1DC2%2CB07CNDVSKQ%2CB085CS676B&srpt=FASTENER_DRIVE_BIT&linkCode=li2&tag=gradescaler-21&linkId=a627eefb86e589283133e2da6206beae&language=de_DE&ref_=as_li_ss_il",
    imlink: "//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B001C9X03M&Format=_SL160_&ID=AsinImage&MarketPlace=DE&ServiceVersion=20070822&WS=1&tag=gradescaler-21&language=de_DE",
    title: "HAZET Nuss (1/2 Zoll (12,5 mm)",
    bullets: [
      "Must have to change tires",
    ]
  },
]

export default class App extends Component {
  constructor(props) {
    super(props);
    const defaultData = {
      showerror: false,
      gradeScheme: [1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0, 5.0],
      gradeFrequency: null,
      gradeRanges: null,
      average: null,
      changeOgImage: this.props.changeOgImage,
    }
    const input = props.input
    if (input != null) {
      this.state = {
        input: input,
        data: {
          showerror: false
        }
      }
    } else {
      // default
      this.state = {
        input: {
          // julia: join(filter(x -> 0 <= x <= 50,round.(rand(Normal(65,15), 200))./2), " ")
          points: [28.5, 34.0, 42.0, 43.5, 35.5, 30.5, 22.0, 48.5, 43.0, 45.0, 24.5, 39.5, 32.5, 31.0, 37.0, 32.5, 23.0, 37.0, 29.0, 33.5, 25.5, 18.5, 21.5, 31.0, 38.5, 37.5, 32.0, 22.0, 37.0, 25.0, 23.0, 39.5, 36.5, 33.0, 27.5, 36.5, 39.0, 34.0, 45.5, 37.5, 18.0, 29.0, 15.5, 39.0, 33.0, 32.0, 39.5, 40.5, 20.0, 26.5, 28.5, 40.5, 44.0, 39.5, 33.5, 23.0, 34.0, 27.0, 23.5, 14.0, 30.0, 29.5, 35.5, 31.5, 36.5, 33.5, 42.0, 23.0, 37.5, 34.0, 24.0, 32.5, 34.0, 34.0, 32.0, 34.0, 27.0, 29.5, 24.5, 37.0, 35.0, 25.5, 25.0, 35.0, 29.5, 33.5, 13.5, 24.0, 31.5, 31.5, 14.0, 29.0, 33.5, 28.0, 38.5, 49.0, 25.5, 21.0, 29.5, 27.0, 46.5, 28.0, 35.5, 26.5, 33.0, 32.0, 37.5, 28.5, 31.0, 31.0, 41.0, 29.5, 41.0, 28.0, 38.5, 40.5, 36.0, 37.0, 36.0, 27.5, 33.0, 30.5, 34.0, 31.0, 39.0, 32.5, 20.0, 29.5, 38.5, 35.0, 34.0, 17.0, 26.5, 32.0, 41.5, 20.0, 33.0, 28.0, 33.5, 29.0, 30.0, 35.5, 28.5, 39.0, 30.5, 36.0, 32.5, 22.5, 32.0, 39.0, 35.5, 30.5, 33.0, 36.0, 42.5, 30.0, 32.0, 32.0, 30.5, 31.5, 32.0, 33.0, 32.5, 33.0, 27.0, 24.0, 34.5, 26.0, 33.5, 25.0, 29.5, 40.5, 30.5, 32.0, 32.0, 33.0, 26.5, 23.5, 40.5, 42.0, 33.0, 34.5, 35.0, 38.0, 30.5, 32.5, 41.0, 38.5, 30.5, 29.0, 32.5, 25.5, 42.5, 37.0, 40.0, 44.5, 31.0, 31.5, 27.5, 35.0],
          maxpts: 50,
          roof: 50,
          base: 25,
          roundingMultiplier: 0.5,
        },
        data: {
          showerror: false,
        }
      };
    }
    this.data = defaultData;
  }

  calculateGrade = (pts) => {
    const grades = this.data.gradeScheme
    const ranges = this.data.gradeRanges
    if (grades != null) {
      for (var i = 0; i < ranges.length; i++) {
        if (pts >= ranges[ranges.length - i - 1]) {
          return grades[i]
        }
      }
    }
    return "error"
  }

  roundm(x, multiple) {
    return Math.round(x / multiple) * multiple;
  }

  updateData() {
    // grade ranges
    const diff = parseFloat(this.state.input.roof) - parseFloat(this.state.input.base)
    const gradeRangesExact = [0].concat(
      [...Array(10).keys()].map(x => parseFloat(this.state.input.base) + 0.1 * (x) * diff)
    )
    const gradeRanges = gradeRangesExact.map(
      x => this.roundm(x, this.state.input.roundingMultiplier)
    )
    this.data.gradeRanges = gradeRanges;

    // grade frequcencies
    const gradeDict = this.state.input.points.map(pts => this.calculateGrade(pts))
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    const gradeFrequency = this.data.gradeScheme.map(gr => countOccurrences(gradeDict, gr))
    this.data.gradeFrequency = gradeFrequency;

    // average
    const weightedSumArray = this.data.gradeFrequency.map(
      (e, i) => this.data.gradeScheme[i] * e
    );
    const numParticipants = this.data.gradeFrequency.reduce((a, b) => a + b, 0)
    const weightedSum = weightedSumArray.reduce((a, b) => a + b, 0)
    const average = weightedSum / numParticipants;
    this.data.average = average.toPrecision(3);
  }

  validateInput() {
    return (
      !isNaN(parseFloat(this.state.input.maxpts)) &&
      !isNaN(parseFloat(this.state.input.roof)) &&
      !isNaN(parseFloat(this.state.input.base)) &&
      !isNaN(parseFloat(this.state.input.roundingMultiplier)) &&
      true
    )
  }

  render() {
    if (
      !this.state.data.showerror &&
      this.validateInput()
    ) {
      this.updateData()
    }
    return (
      <div>
        <Header />
        <div className="p-0 m-0">
          <Container className="">
            <Row>
              <Col>
                <div className="">
                  <h2 className="rounded border shadow-sm fs-4 fw-bold m-2 text-center">⚙️ Settings & Input</h2>
                  <Container className="m-0 p-2">
                    <Row>
                      <Col>
                        <InputGroup className="mb-1 p-0">
                          <InputGroup.Text id="basic-addon1">💯 Max.</InputGroup.Text>
                          <FormControl
                            value={this.state.input.maxpts}
                            aria-label={this.state.input.maxpts}
                            aria-describedby="basic-addon1"
                            onChange={event => {
                              this.checkInputForPositiveNumericValue(event.target.value)
                              this.setState({ input: { ...this.state.input, maxpts: event.target.value } })
                            }}
                          />
                        </InputGroup>
                        <InputGroup className="mb-1 p-0">
                          <InputGroup.Text id="basic-addon2">⬆️ Roof</InputGroup.Text>
                          <FormControl
                            value={this.state.input.roof}
                            aria-label={this.state.input.roof}
                            aria-describedby="basic-addon2"
                            onChange={event => {
                              this.checkInputForPositiveNumericValue(event.target.value)
                              this.setState({ input: { ...this.state.input, roof: event.target.value } })
                            }}
                          />
                          <input
                            type="range"
                            className="form-range"
                            min={this.state.input.base}
                            max={this.state.input.maxpts}
                            step={this.state.input.roundingMultiplier}
                            id="customRange3"
                            value={this.state.input.roof}
                            aria-label={this.state.input.roof}
                            aria-describedby="basic-addon2"
                            onChange={event => {
                              this.setState({ input: { ...this.state.input, roof: event.target.value } })
                            }}
                            disabled = {this.state.data.showerror}
                          ></input>
                        </InputGroup>
                        <InputGroup className="mb-1 p-0">
                          <InputGroup.Text id="basic-addon3">⬇️ Base</InputGroup.Text>
                          <FormControl
                            value={this.state.input.base}
                            aria-label={this.state.input.base}
                            aria-describedby="basic-addon3"
                            onChange={event => {
                              this.checkInputForPositiveNumericValue(event.target.value)
                              this.setState({ input: { ...this.state.input, base: event.target.value } })
                            }}
                          />
                          <input
                            type="range"
                            className="form-range"
                            min="0"
                            max={this.state.input.roof}
                            step={this.state.input.roundingMultiplier}
                            id="customRange4"
                            value={this.state.input.base}
                            aria-label={this.state.input.base}
                            aria-describedby="basic-addon3"
                            onChange={event => {
                              this.setState({ input: { ...this.state.input, base: event.target.value } })
                            }}
                            disabled = {this.state.data.showerror}
                          ></input>
                        </InputGroup>
                        <InputGroup className="mb-1 p-0">
                          <InputGroup.Text id="basic-addon4">🔗 Round</InputGroup.Text>
                          <FormControl
                            value={this.state.input.roundingMultiplier}
                            aria-label={this.state.input.roundingMultiplier}
                            aria-describedby="basic-addon4"
                            onChange={event => {
                              this.checkInputForPositiveNumericValue(event.target.value)
                              this.setState({ input: { ...this.state.input, roundingMultiplier: event.target.value } })
                            }}
                          />
                        </InputGroup>
                      </Col>
                      <Col>
                        <InputGroup className="">
                          <InputGroup.Text>Input</InputGroup.Text>
                          <FormControl
                            as="textarea"
                            style={{ height: '175px' }}
                            placeholder={this.state.input.points.join(" \n")}
                            onChange={event => {
                              this.handlePointsInput(event.target.value)
                            }}
                          />
                        </InputGroup>
                        <div className="text-center">
                          <Button className="btn-sm m-1" variant="danger" onClick={() => { if (typeof window !== "undefined"){window.location.href = "/" }}}>
                            <small>☢️ Reset</small>
                          </Button>
                          <CopyButtonWithOverlay copyUrl={(typeof window !== "undefined") ? window.location.protocol + "//" + window.location.host + '/' + JSON.stringify(this.state.input) : ''} />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                  {
                    this.state.data.showerror
                      ?
                      <div className="text-center d-flex justify-content-center">
                        <Alert className="m-2" key="warn" variant="danger">
                          <Alert.Heading>🚨 Error in input field.</Alert.Heading>
                          <ul className="text-start">
                            <li>"Max", "Roof", "Base", "Round" have to be positive numbers.</li>
                            <li>Only numeric values are allowed.</li>
                            <li>Decimal separator can be point or comma.</li>
                            <li>The list separator must be any whitespace or a newline.</li>
                          </ul>
                          <hr />
                          <p className="mb-0">
                            ➡️ If you don't know how to fix it, reset the whole app and start again.
                          </p>
                        </Alert>
                      </div>
                      :
                      ''
                  }
                </div>
                <div className="">
                  <h2 className="rounded border shadow-sm fs-4 fw-bold m-2 text-center">📉 Results</h2>
                  <Container fluid>
                    <Row>
                      <Col md={6}>
                        <h3 className="fs-6 text-center">Indicators</h3>
                        <IndicatorTable
                          gradeFrequency = {this.data.gradeFrequency}
                          average = {this.data.average}
                          gradeRanges = {this.data.gradeRanges}
                          maxpts = {this.state.input.maxpts}
                          roof = {this.state.input.roof}
                          base = {this.state.input.base}
                          roundingMultiplier = {this.state.input.roundingMultiplier}
                          changeDescription = {this.props.changeDescription}
                        />
                        <h3 className="fs-6 text-center">Graphical data</h3>
                        <GradeFreqBarChart
                          changeOgImage = {this.data.changeOgImage}
                          labels = {this.data.gradeScheme}
                          data = {this.data.gradeFrequency}
                        />
                        <GradeRangesLineChart
                          points = {this.state.input.points}
                          gradeRange = {this.data.gradeRanges}
                          gradeScheme = {this.data.gradeScheme}
                          maxpts = {this.state.input.maxpts}
                        />
                      </Col>
                      <Col md = {6}>
                        <h3 className="fs-6 text-center">Tabular data</h3>
                        <DataTable
                          gradeScheme = {this.data.gradeScheme}
                          gradeRanges = {this.data.gradeRanges}
                          gradeFrequencies = {this.data.gradeFrequency}
                          maxpts = {this.state.input.maxpts}
                        />
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div className="">
                  <h2 className="rounded border shadow-sm fs-4 fw-bold m-2 text-center">📚 About</h2>
                  <Container className="">
                    <Row><Col>
                      Grade Scaler calculates adaptive grading scales and presents graphical exam statistics. Since exams change from semester to semester, the grading scheme, sometimes, has to be adapted to account for, e.g., overly hard exam questions. Grade Scaler transforms a list of exam points into a corresponding grade mapping by applying a variable exam passing limit (<i>Base</i>) and a variable best grade limit (<i>Roof</i>).
                    </Col></Row>
                  </Container>
                </div>
              </Col>
              <Col sm={12} md={12} lg={12} xl={4} xxl={3}>
                <h2 className="rounded border shadow-sm fs-4 fw-bold m-2 text-center">🧑‍🏫 Teacher's Must-Havs</h2>
                <AmazonLinkCards data={AmazonAffiliateData} />
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
        <NextSeo
          title="Grade Scaler"
          additionalLinkTags={[
            {
              rel: 'icon',
              href: '/favicon.ico',
            },
            {
              rel: 'apple-touch-icon',
              href: '/logo192.png',
            },
            {
              rel: 'manifest',
              href: '/manifest.json'
            }
          ]}
        />
        {
          !this.props.changeDescription ?
          <NextSeo
            description="The exam grading scheme calculator"
          />
          :
          ""
        }
      </div>
    )
  }





  checkInputForPositiveNumericValue(inputString) {
    if (inputString === "") {
      this.setState({ data: { ...this.state.data, showerror: true } })
    } else {
      if (isNaN(inputString)) {
        this.setState({ data: { ...this.state.data, showerror: true } })
      } else {
        if (parseFloat(inputString) < 0) {
          this.setState({ data: { ...this.state.data, showerror: true } })
        } else {
          this.setState({ data: { ...this.state.data, showerror: false } })
        }
      }
    }
  }

  handlePointsInput(inputString) {
    inputString = inputString.replaceAll(',', '.')
    const pts = inputString.split(/\s+/)
    if (pts.some(isNaN)) {
      this.setState({ data: { ...this.state.data, showerror: true } })
    } else {
      this.setState({ data: { ...this.state.data, showerror: false } })
      this.setState({ input: { ...this.state.input, points: pts } })
    }
  }

  renderCopyMessage = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );
}

class AmazonLinkCards extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true
    }
  }
  render() {
    if (!this.state.disabled) {
      return (
        <div className="m-1 row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-2 g-3">
          {
            this.props.data.map(
              (prod) =>
                <AmazonLinkCard
                  key={prod.link}
                  link={prod.link}
                  imlink={prod.imlink}
                  title={prod.title}
                  bullets={prod.bullets}
                  includeFeedback={false}
                />
            )
          }
          <AddCustomAmazonProductCard />
        </div>
      )
    } else {
      return (
        <div className="row-cols-1 m-2">
          <Button
            className="" variant="outline-primary" target="_blank"
            onClick={event => {
              this.setState({disabled: false})
            }}
          >
            I agree to the display of external content from Amazon.
          </Button>
        </div>
      )
    }
  }
}



class AddCustomAmazonProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      asin: null
    };
    this.data = {
      asin: null
    };
  }

  render() {
    if (this.state.asin === null) {
      return (
        <div className="m-0 p-2">
          <Card className="">
            <Card.Body>
              <div className="">
                <strong><small>Tell me your favorite</small></strong>
              </div>
              <InputGroup className="mb-1 p-0" size="sm">
                <InputGroup.Text id="basic-addon5">ASIN</InputGroup.Text>
                <FormControl
                  placeholder="B07Q9MJKBV"
                  aria-label="B07Q9MJKBV"
                  aria-describedby="basic-addon5"
                  onChange={event => {
                    this.data.asin = event.target.value;
                  }}
                />
              </InputGroup>
              <Button
              className="btn-sm" variant="outline-primary" target="_blank"
              onClick={event => {
                this.setState({asin: this.data.asin})
              }}
              >💻 Preview!</Button>
            </Card.Body>
          </Card>
        </div>
      )
    } else {
      return (
        <AmazonLinkCard
          key="newProd"
          link={"https://www.amazon.de/dp/" + this.state.asin + "?&linkCode=ll1&tag=gradescaler-21"}
          imlink={"//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=" + this.state.asin + "&Format=_SL250_&ID=AsinImage&MarketPlace=DE&ServiceVersion=20070822&WS=1&tag=&language=de_DE"}
          title="Your suggestion"
          bullets={["your favorite specs", "reasons to choose"]}
          includeFeedback={true}
        />
      )
    }
  }
}

class AmazonLinkCard extends React.Component {
  render() {
    return (
      <div className="m-0 p-2">
        <Card className="">
          <a href={this.props.link}><Card.Img variant="top" src={this.props.imlink} alt={this.props.title + " Image"} /></a>
          <Card.Body>
            <div className="">
              <strong><small>{this.props.title}</small></strong>
              <ListGroup className="m-0 p-0 fs-sm" variant="flush">
                {
                  this.props.bullets.map(
                    bul => <ListGroup.Item key={bul} className="m-0 p-0"><small>{bul}</small></ListGroup.Item>
                  )
                }
              </ListGroup>
            </div>
            <div className="">
            <Button className="btn-sm" variant="outline-primary" target="_blank" href={this.props.link}>😍 Get it!</Button>
            {
              this.props.includeFeedback
                ?
                <Button className="btn-sm" variant="outline-primary" target="_blank" href="mailto:poldi.icq(at)arcor.de?subject=Product%20Recommendation">💌 Tell me!</Button>
                :
                ''
            }
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

class GradeFreqBarChart extends React.Component {
    constructor(props) {
      super(props)
      this.gradeFreqBarChartRef = createRef();
      this.changeOgImage = this.props.changeOgImage;
    }
    render() {
      this.data = {
        labels: this.props.labels,
        datasets: [
          {
            label: 'Grade Distribution',
            data: this.props.data,
            backgroundColor: 'blue',
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
      };
      this.options = {
        maintainAspectRatio: true,
        scales: {
          x: {
            display: true,
          },
          y: {
            ticks: {
              beginAtZero: true,
            },
          },
        },
        animation: false,
      };
      return (
        <div>
          {
          this.changeOgImage ?
          <NextSeo
            openGraph={{
              type: 'website',
              images: [
                {
                  url: 'https://quickchart.io/chart?c=' + encodeURI(JSON.stringify({type: "bar", data: this.data, options: this.options})),
                  width: 800,
                  height: 600,
                  alt: 'Og Image Alt',
                }
              ],
            }}
          />
          :
          ""
          }
        <Bar ref={this.gradeFreqBarChartRef} data={this.data} options={this.options} />
        </div>
      );
    }
}

class GradeRangesLineChart extends React.Component {
  render() {
    const plotData = this.props.gradeRange.map(
      (e, i) => {
        return ({ "x": e, "y": this.props.gradeScheme[this.props.gradeScheme.length - 1 - i] });
      }
    ).concat({ "x": this.props.maxpts, "y": 1 })

    const pts = this.props.points;
    const frequencyDict = {};
    for (let i=0; i<pts.length; i++) {
      if (frequencyDict[pts[i]] > 0) {
        frequencyDict[pts[i]] = frequencyDict[pts[i]]+1;
      } else {
        frequencyDict[pts[i]] = 1;
      }
    }
    const frequencyArray = Object.values(frequencyDict).map(
      (freq) => parseInt(freq)
    );
    const maxFreq = Math.max(...frequencyArray);
    const scatterData = [];
    for (const [key, value] of Object.entries(frequencyDict)) {
      for (let i=0; i < value; i++) {
        scatterData.push(
          {
            x: key,
            // map to the range [1,5]
            y: this.props.gradeScheme[this.props.gradeScheme.length-1] - (i / maxFreq/2) * (this.props.gradeScheme[this.props.gradeScheme.length-1] - this.props.gradeScheme[1])
          }
        )
      }
    }

    const data = {
      datasets: [
        {
          label: "Scheme Function",
          type: "line",
          data: plotData,
          stepped: true,
          backgroundColor: [
            '#0d6efd'
          ],
          borderColor: [
            'rgba(0, 0, 0)',
          ],
          borderWidth: 1,
        },
        {
          label: "Points",
          type: "scatter",
          data: scatterData,
          backgroundColor: [
            'red'
          ],
        },
      ],
    };
    const options = {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          display: true,
        },
        yAxes: {
          reverse: true,
        },
      },
      animation: false,
    };
    return (
      <Line data={data} options={options} />
    )
  }
}

function CopyButtonWithOverlay(props) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <Button className="m-1 btn-sm p-1" variant="primary" ref={target} onClick={() => {
        navigator.clipboard.writeText(encodeURI(props.copyUrl))
        setShow(true)
        setTimeout(() => { setShow(false); }, 2000);
      }
      }>
        <small>✉️ Share </small>
      </Button>
      <Overlay target={target.current} show={show} placement="top">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            ✅ Copied link into clipboard!
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

class Header extends Component {
  render() {
    return (
      <h1 className="fs-1 fw-bold border-bottom pb-2 text-center">
        <img className="m-2" style={{ height: '40px' }} src="logo192.png" alt="Logo" />
        <span className="align-middle">Grade Scaler</span> <Badge bg="primary">v1</Badge>
      </h1>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <div className="m-3 p-2 text-center border-top">
        <div className="">🇩🇪 Made in Germany</div>
        <div className="">🔒 No data transmission, no server, works offline</div>
          <div className="text-center">
            <LegalButton />
            <Button className="btn-sm m-1" variant="info" href="https://github.com/lamBOOO/gradescaler">🧑‍💻 Github</Button>
            <Button className="btn-sm m-1" variant="success" href="https://www.buymeacoffee.com/theisen">☕️ Buy me a coffee</Button>
          </div>
        </div>
    )
  }
}

function LegalButton() {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <span ref={ref}>
      <Button className="btn-sm m-1" onClick={handleClick}>
        🧑‍⚖️ Legal info / Impressum
      </Button>
      <Overlay
        show={show}
        target={target}
        placement="top"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Header>
            Legal info
          </Popover.Header>
          <Popover.Body>
            <strong>
              Impressum
            </strong>
            <br></br>
            Lambert Theisen Digital Solutions<br></br>
            <a href="http://lambert-theisen.de">www.lambert-theisen.de</a><br></br>
            poldi.icq(at)arcor.de<br></br>
          </Popover.Body>
        </Popover>
      </Overlay>
    </span>
  );
}

class DataTable extends Component {
  render() {
    const gradeScheme = this.props.gradeScheme;
    let tmpRanges = this.props.gradeRanges;
    tmpRanges.push(this.props.maxpts);
    const gradeRanges = this.props.gradeRanges;
    const gradeFrequencies = this.props.gradeFrequencies;
    const totalParticipants = gradeFrequencies.reduce((a, b) => a + b, 0)
    const tableBody = gradeScheme.map(
      (e, i) => <tr key={i}>
        <td key={i + 1}>{e}</td>
        <td key={i + 2}>{parseFloat(gradeRanges[gradeRanges.length - 2 - i]).toPrecision(3)}</td>
        <td key={i + 3}>{parseFloat(gradeRanges[gradeRanges.length - 1 - i]).toPrecision(3)}</td>
        <td key={i + 4}>{gradeFrequencies[i]}</td>
        <td key={i + 5}>{(100 * gradeFrequencies[i] / totalParticipants).toPrecision(3)} %</td>
      </tr>
    )
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr key="a">
              <th key="1">Grade</th>
              <th key="2">≥</th>
              <th key="3">&lt;</th>
              <th key="4" colSpan="2">Frequency</th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </Table>
      </div>
    );
  }
}

class IndicatorTable extends Component {
  render() {
    const num = this.props.gradeFrequency.reduce((a, b) => a + b, 0);
    const failrateperc = (100 * this.props.gradeFrequency[this.props.gradeFrequency.length - 1] / this.props.gradeFrequency.reduce((a, b) => a + b, 0)).toPrecision(3);
    const passrateperc = (100 * this.props.gradeRanges[1] / this.props.maxpts).toPrecision(3);
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>👩‍👩‍👦‍👦 Num</th>
              <th>📊 Average</th>
              <th>❌ Failing Rate</th>
              <th>🥳 Percentage to pass</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{num}</td>
              <td>{this.props.average}</td>
              <td>{failrateperc} %</td>
              <td>{passrateperc} %</td>
            </tr>
          </tbody>
        </Table>
        {
          this.props.changeDescription ?
          <NextSeo
            description={`💯:${this.props.maxpts} ⬆️:${this.props.roof} ⬇️:${this.props.base} 🔗: ${this.props.roundingMultiplier} 👩‍👩‍👦‍👦:${num} 📊:${this.props.average} ❌:${failrateperc}% 🥳:${passrateperc}%`}
          />
          :
          ""
        }
      </div>
    );
  }
}
