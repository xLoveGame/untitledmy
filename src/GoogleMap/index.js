import React, {useEffect, useState, useRef} from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';
import {Alert, message, notification, Popover, Tooltip} from 'antd';
import Marker from '../Marker';
import ClusterMarker from '../ClusterMarker';
import './index.css';
import mapStyles from './mapStyles.json';
import {markersData, susolvkaCoords, test} from '../fakeData';

import MapWrapper from './MapWrapper';
import axios from "axios";
import {wait} from "@testing-library/user-event/dist/utils";
import Search from "antd/es/input/Search";
import {InfoBox} from "@react-google-maps/api";
import TextArea from "antd/es/input/TextArea";

const MAP = {
    defaultZoom: 16,
    defaultCenter: susolvkaCoords,
    options: {
        // styles: mapStyles,
        maxZoom: 30,
    },
};

function GoogleMap() {
    const ref = useRef(null);
    const [center, setCenter] = useState(MAP.defaultCenter);
    const [number, setNumber] = useState()
    const [my, setMy] = useState()
    const [loading, setLoading] = useState(true)
    const [sta, setSta] = useState(true)
    const [myValue, setMyValue] = useState("")
    // eslint-disable-line react/prefer-stateless-function
    let state;
    state = {
        myData: [],
        mapOptions: {
            center: MAP.defaultCenter,
            zoom: MAP.defaultZoom,
        },
        clusters: [],
        loading: true
    };

    /*
        componentDidMount() {
            axios.get('/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592').then(res => {
                //console.log(res.data[0].location.latitude)
                this.setState({mydata: res.data})
                this.setState({loading: false})
                console.log(this.state.mydata[0].location)
            })
        }
    */


    /*state.clusters=clusters.map(({wx, wy, numPoints, points}) => ({
        lat: wy,
        lng: wx,
        numPoints,
        id: `${numPoints}_${points[0].id}`,
        points,
    }))

    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (sta) {

            axios.get('/api/crimes-street/all-crime?lat=51.882000&lng=-5.269000').then(res => {
                setNumber(res.data.length)
                setMy(res.data)
                setLoading(false)
            })
        }
    }, [])


    if (loading) {
        return <div>Please wait a minute, the page is loading!! </div>
    }


    state.clusters = [...Array(my.length)].fill(0)
        .map((__, index) => ({
            id: index,
            lat:
            my[index].location.latitude,
            lng:
            my[index].location.longitude,
        }));



    function onSearch(value) {
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + value + "&key=AIzaSyB0l31-liHi0g6OdH6e5avHe9sNaGnY65g")
            .then(res => {
                //  console.log(res.data.results[0].geometry.location.lat)
                axios.get('/api/crimes-street/all-crime?lat=' + res.data.results[0].geometry.location.lat +
                    '&lng=' + res.data.results[0].geometry.location.lng).then(res1 => {
                    console.log(res1)
                    state.mapOptions.center = {lat: res.data.results[0].geometry.location.lat, lng:res.data.results[0].geometry.location.lng}
                    // MAP.defaultCenter =
                    setCenter( {lat: res.data.results[0].geometry.location.lat, lng:res.data.results[0].geometry.location.lng})
                    setMy(res1.data)
                    setNumber(res1.data.length)
                    setSta(false)
                    setLoading(false)
                })
            })
    }

    //console.log(my)


    function sendOut(item) {
        setMyValue(my[item].category)
        console.log(my[item])
    }

    return (

            <MapWrapper  > <b><a style={{    fontsize: 20, margin: 10, color: "#003366",
            }}>Enter PostCode Here: </a> </b>
                <Search
                    style={{    fontsize: 20, margin: 10, color: "#003366",
                    }}
                    placeholder="post code "
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
                <b> <a style={{    fontsize: 20, margin: 10, color: "#003366",
                }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;That's a {myValue} crime!
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The total crime number in 1 mile is {number} </a> </b>
                <br/>
                <GoogleMapReact
                    defaultZoom={MAP.defaultZoom}
                    // defaultCenter={center}
                    center={center}
                    options={MAP.options}
                    //onChange={handleMapChange}
                    onChildClick={sendOut}
                    yesIWantToUseGoogleMapApiInternals
                    bootstrapURLKeys={{key: 'AIzaSyB0l31-liHi0g6OdH6e5avHe9sNaGnY65g'}}
                >
                    {state.clusters.map(item => {
                        return (
                            <Marker
                                key={item.id}
                                lat={item.lat}
                                lng={item.lng}
                                //text="AAAAAAAAAAAAAAAAA"
                                onclick={sendOut.bind(this, item)}
                            >
                            </Marker>
                        );
                    })}

                </GoogleMapReact>
            </MapWrapper>
    );
}


export default GoogleMap;
