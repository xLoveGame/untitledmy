import React, {useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';
import {Alert, message, notification, Popover, Tooltip} from 'antd';
import Marker from '../Marker';
import ClusterMarker from '../ClusterMarker';

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
        styles: mapStyles,
        maxZoom: 30,
    },
};

function GoogleMap() {
    const [my, setMy] = useState()
    const [loading, setLoading] = useState(true)
    const [sta, setSta] = useState(true)
    const [myvalue, setMyvalue] = useState("")
    // eslint-disable-line react/prefer-stateless-function
    let state;
    state = {
        mydata: [],
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

            axios.get('/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592').then(res => {
                //console.log(res.data[0].location.latitude)
                setMy(res.data)
                setLoading(false)
            })
            console.log("AAAAA")
        }
    }, [])


    if (loading) {
        return <div>please wait a minute, the page is loading!! </div>
    }


    state.clusters = [...Array(my.length)].fill(0)
        .map((__, index) => ({
            id: index,
            lat:
            my[index].location.latitude,
            lng:
            my[index].location.longitude,
        }));

    /*
        function getClusters() {
            const clusters = supercluster(state.clusters, {
                    minZoom: 0,
                    maxZoom: 40,
                    radius: 100,
                }
            );
            console.log(clusters)
            console.log(state.mapOptions)
            console.log(clusters(state.mapOptions))
            return clusters(state.mapOptions)

        }

        function createClusters(props) {
            console.log(getClusters(props))
            state.clusters = (state.mapOptions.bounds ? getClusters(props).map(({wx, wy, numPoints, points}) => ({

                lat: wy,
                lng: wx,
                numPoints,
                id: `${numPoints}_${points.id}`,
                points,
            })) : [])
            console.log("123")
        }


        function handleMapChange({center, zoom, bounds}) {


            // eslint-disable-next-line no-unused-expressions
            state.mapOptions = {
                center,
                zoom,
                bounds,
            },
                console.log(state.mapOptions)
            createClusters(this.props);

        }*/


    function onSearch(value) {
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + value + "&key=AIzaSyB0l31-liHi0g6OdH6e5avHe9sNaGnY65g")
            .then(res => {
                //  console.log(res.data.results[0].geometry.location.lat)
                axios.get('/api/crimes-street/all-crime?lat=' + res.data.results[0].geometry.location.lat +
                    '&lng=' + res.data.results[0].geometry.location.lng).then(res1 => {
                    console.log(res1)
                    state.mapOptions.center = {lat: res.data.results[0].geometry.location.lat, lng:res.data.results[0].geometry.location.lng}
                    MAP.defaultCenter = {lat: res.data.results[0].geometry.location.lat, lng:res.data.results[0].geometry.location.lng}
                    setMy(res1.data)
                    setSta(false)
                    setLoading(false)
                })
            })
    }

    //console.log(my)


    function sendout(item) {
        setMyvalue(my[item].category)
        console.log(my[item])
    }


    return (

            <MapWrapper >please input where you want to search:
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}

                /> <a >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this is a {myvalue} crime!</a>
                <GoogleMapReact
                    defaultZoom={MAP.defaultZoom}
                    defaultCenter={MAP.defaultCenter}
                    options={MAP.options}
                    //onChange={handleMapChange}
                    onChildClick={sendout}
                    yesIWantToUseGoogleMapApiInternals
                    bootstrapURLKeys={{key: 'AIzaSyB0l31-liHi0g6OdH6e5avHe9sNaGnY65g'}}
                >
                    {state.clusters.map(item => {
                        //console.log(item.numPoints)

                        return (
                            <Marker
                                key={item.id}
                                lat={item.lat}
                                lng={item.lng}
                                text="AAAAAAAAAAAAAAAAA"
                                onclick={sendout.bind(this, item)}
                            >
                            </Marker>

                        );


                    })}

                </GoogleMapReact>
            </MapWrapper>

    );

}


export default GoogleMap;
