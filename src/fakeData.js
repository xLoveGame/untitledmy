import axios from "axios";
import {useEffect, useState} from "react";

const TOTAL_COUNT = 500;
// eslint-disable-next-line react-hooks/rules-of-hooks


    export const susolvkaCoords = {lat: 51.882000, lng:	-5.269000};

export const markersData = [...Array(TOTAL_COUNT)]
    .fill(0) // fill(0) for loose mode
    .map((__, index) => ({
        id: index,
        lat:
            susolvkaCoords.lat +
            index * 0.01,
        lng:
            0,
    }));

export function test() {
    return axios.get('/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592').then(res => {
            //console.log(res.data[0].location.latitude)
            return res.data
        }
    )
}

/*

*/