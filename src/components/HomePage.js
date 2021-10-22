import React, { Component, useState, useEffect } from 'react'
import './home.css';
export function Seat() {
    const [filled, setFilled] = useState([4, 7, 19, 58, 78]);
    const [value, setValue] = useState(0);
    let arr = []
    let extra = []
    const[ans, setAns] = useState([])
    const total = 80;
    const numrows = Math.floor(total / 7);
    const left = 80 % 7;
    let i
    for (i = 0; i < numrows; i++) {
        arr[i] = new Array(7);
        for (let j = 0; j < 7; j++) {
            arr[i][j] = 1;
        }
    }
    arr[i] = new Array(left)

    for (let j = 0; j < left; j++) {
        arr[i][j] = 1;
    }

    for (let j = 0; j < filled.length; j++) {
        let ith = Math.floor(filled[j] / 7);
        let jth = Math.floor(filled[j] % 7);
        arr[ith][jth] = 0;
    }

    function handleChange(value) {
        !(value <= 7 && value >= 0) ? alert("enter valid input") : setValue(value);
    }

    useEffect(() => {
        extra = [];
        let cval = value;
        let rowArr = new Array(i + 1);
        rowArr.fill(0)
        for (let a = 0; a < arr.length; a++) {
            for (let b = 0; b < arr[a].length; b++) {
                if (arr[a][b] == 1) {
                    rowArr[a] = rowArr[a] + 1;  
                }
            }
        }
        let ccval = -1
        console.log(rowArr);
        if (value != 0) {
            if (value <= 80 - filled.length) {
                let flag = false;
                for (let a = 0; a < arr.length; a++) {
                    console.log(rowArr[a]);
                    if (rowArr[a] >= value) {
                        flag = true;
                        ccval = value;
                        for (let b = 0; b < arr[a].length; b++) {
                            if (ccval > 0) {
                                if (arr[a][b] == 1) {
                                    rowArr[a]++;
                                    arr[a][b] = 0;
                                    extra.push(Number(a * 7) + Number(b));
                                    ccval--;
                                }
                            }
                        }
                    }
                    if (flag) {
                        console.log(extra);
                        break;
                    }
                }

                if (ccval == -1) {
                    let cval = value;
                    for (let a = 0; a < arr.length; a++) {
                        for (let b = 0; b < arr[a].length; b++) {
                            if(cval > 0){
                            if (arr[a][b] == 1) {
                                rowArr[a] = rowArr[a] + 1;
                                arr[a][b] = 0;
                                extra.push(Number(a*7)+Number(b));
                                console.log("abc");
                                cval--;
                                }   
                            }
                        }
                    }
                }
                // console.log("");
                setFilled([...filled, ...extra]);
                // console.log(extra);
            } else {
                alert("Seats are not available")
            }
        }
        setAns([...extra]);
    }, [value])


    return (
        <div className="flex">
            <label className="center">Enter the number of seats you want to book : </label>
            <input type="number" value={value} onChange={(e) => { handleChange(e.target.value) }}></input>
            <br />
            <table className="center">

                <tbody>
                    {arr.map((item, index) => {
                        return (
                            <div>

                                <tr>
                                    {
                                        item.map((itemVal, idx) => {
                                            return (
                                                <>
                                                    <td> {

                                                        arr[index][idx] == 0 ? <div id={Number(index * 7) + (Number)(idx)} className="border filled">{Number(index * 7) + (Number)(idx) + 1}</div>
                                                            : <div id={Number(index * 7) + (Number)(idx)} className="border">{Number(index * 7) + (Number)(idx) + 1}</div>
                                                    }
                                                    </td>
                                                </>
                                            )
                                        })
                                    }
                                </tr>
                            </div>
                        )
                    })}
                </tbody>
            </table>

            <div>
                <h1 classNmae = "middle">Currently booked seats </h1>
                {ans.map((val, i) => {
                    return <b>{val + " "}</b>
                })}
            </div>
        </div>

    )

}
