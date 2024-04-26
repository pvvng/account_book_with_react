import { useEffect, useState, memo, useMemo } from 'react';
import '../css/app.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux'
import { ResponsivePie } from '@nivo/pie'

export function Graph(){

  let userData = useSelector(state => state.userData)
  let [caroselCount, setCaroselCount] = useState(0)
  let [moveCarosel, setMoveCarosel] = useState(0)
  let [leftArrowHead, setLeftArrowHead] = useState('hide')
  let [rightArrowHead, setRightArrowHead] = useState('')
  let [assetBtnCount, setAssetBtnCount] = useState(-1)
  let [plusBtnColor, setPlusBtnColor] = useState('')
  let [minusBtnColor, setMinusBtnColor] = useState('')
  const today = new Date()
  const formattedDate = today.getMonth() + 1
  let arr = new Array(12).fill(0)

  let nowMonthData = userData[(caroselCount+1).toString()]
  
  let [opacity, setOpacity] = useState('')

  let totalPlusPrice = 0
  let totalMinusPrice = 0
  let chartPlusData = []
  let chartMinusData = []

  useEffect(()=>{
    let a = setTimeout(() => {
        setOpacity('op2')
    }, 10);
    return ()=>{setOpacity(''); clearTimeout(a)}
  },[])

  useEffect(()=>{
    if(assetBtnCount == 1){
      setPlusBtnColor('plusBtn')
      setMinusBtnColor('menu-btn')
    }else if (assetBtnCount == -1){
      setPlusBtnColor('menu-btn')
      setMinusBtnColor('minusBtn')
    }else{
      setPlusBtnColor('menu-btn')
      setMinusBtnColor('menu-btn')
    }
  },[assetBtnCount])

  useEffect(()=>{
    if(caroselCount > 0 && caroselCount < 11){
      setLeftArrowHead('')
      setRightArrowHead('')
    }if(caroselCount == 11){
      setLeftArrowHead('')
      setRightArrowHead('hide')
    }if(caroselCount == 0){
      setLeftArrowHead('hide')
    }
  },[caroselCount])

  useEffect(()=>{
    setCaroselCount(formattedDate-1)
    setMoveCarosel(-(formattedDate-1) * 100)
  },[])

  setCharts(nowMonthData, totalPlusPrice, totalMinusPrice, chartPlusData, chartMinusData)

  chartPlusData.map(a => {
    totalPlusPrice = totalPlusPrice + a.price
  })

  chartMinusData.map(a => {
    totalMinusPrice = totalMinusPrice + a.price
  })

  return(
    <div className={`op1 ${opacity}`}>

      {/* navbar */}
      <div className='main-navbar1 title'>   
        <span>통계</span>
        <p className='today-date'>{today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}일</p>
      </div>
      
      {/* carosel */}
      <div style={{overflow:'hidden'}}>
        <div style={{width:'1200vw'}}>
          <div style={{transform: `translateX(${moveCarosel}vw)`, transition:'all 0.5s'}}>
          {
            arr.map((a,i) => {
              return(
                <div className='main-navbar1' style={{fontSize:'20px', width:'100vw', float:'left'}} key={i}>
                  <div className='row'>
                    <div className='col-4' style={{textAlign:'left'}}>
                      <FontAwesomeIcon icon={faAngleUp} style={{transform:'rotate(-90deg)'}} className={`${leftArrowHead}`} onClick={()=>{
                        setCaroselCount(caroselCount-1)
                        setMoveCarosel(moveCarosel+100)
                      }}/>
                    </div>
                    <div className='col-4'>{i+1}월</div>
                    <div className='col-4' style={{textAlign:'right'}}>
                      <FontAwesomeIcon icon={faAngleUp} style={{transform:'rotate(90deg)'}} className={`${rightArrowHead}`} onClick={()=>{
                        setCaroselCount(caroselCount+1)
                        setMoveCarosel(moveCarosel-100)
                      }}/>
                    </div>
                  </div>
                </div>
              )
            })
          }
          </div>
        </div>
      </div>
      <hr/>

      {/* asset bar */}
      <div className='main-navbar1'>
        <div className='row'>
          <div className='col-4' key='수입'>
            <p>수입</p>
            <p style={{color:'rgb(66, 66, 255)'}}>
              {totalPlusPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </div>
          <div className='col-4' key='지출'>
            <p>지출</p>
            <p style={{color:'rgb(249, 73, 73)'}}>
              {totalMinusPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </div>
          <div className='col-4' key='합계'>
            <p>합계</p>
            <p>{(totalPlusPrice-totalMinusPrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
          </div>
        </div>
      </div>
      <hr/>

      {/* asset btn */}
      <div className='main-navbar1'>    
        <button className={`btn ${plusBtnColor}`} style={{margin:'5px'}} onClick={()=>{
          setAssetBtnCount(1)
        }}>수입</button>
        <button className={`btn ${minusBtnColor}`} onClick={()=>{
          setAssetBtnCount(-1)
        }}>지출</button>
      </div>
      {/* chart */}
      <div style={{width:'100%', background:'white', marginBottom:'10px'}}>
        <div style={{width:'100%', height:'300px', background:'white'}}>
          {
            assetBtnCount == 1?
            <MyPlusResponsivePie chartPlusData={chartPlusData}/>:
            assetBtnCount == -1?
            <MyMinusResponsivePie chartMinusData={chartMinusData}/>: null
          }
        </div>
      </div>

      {/* cards */}
      <div>
        <ChartCard assetBtnCount={assetBtnCount} chartMinusData={chartMinusData} chartPlusData={chartPlusData} />
      </div>

      {/* shadowbox */}
      <div style={{width:'100%', height:'200px', backgroundColor:'#eee'}}></div>
    </div>
  )
}

function setCharts (nowMonthData, totalPlusPrice, totalMinusPrice, chartPlusData, chartMinusData){

  let plusData = []
  let minusData = []
  let newPlusData = []
  let newMinusData = []

  nowMonthData.map(a => {
    for (let i = 1; i < 32; i++ ){
      if(a[i.toString()] != undefined){
        a[i.toString()].map(b =>{
          if(b.status == 1){
            plusData.push(b)
          }else if (b.status == -1){
            minusData.push(b)
          }
        })
      }
    }
  })

  plusData.map(a => {
    totalPlusPrice = totalPlusPrice + parseFloat(a.price)
    let set = false

    if(newPlusData.length == 0){
      newPlusData.push({type : a.type, price: parseFloat(a.price)})
    }else{
      newPlusData.map(b => {
        if (b.type == a.type){
          set = true
          b.price = parseFloat(b.price) + parseFloat(a.price)
        }
      })
      if (set == false){
        newPlusData.push({type : a.type, price: parseFloat(a.price)})
      }
    }
  })

  minusData.map(a => {
    totalMinusPrice = totalMinusPrice + parseFloat(a.price)
    let set = false

    if(newMinusData.length == 0){
      newMinusData.push({type : a.type, price: parseFloat(a.price)})
    }else{
      newMinusData.map(b => {
         if (b.type == a.type){
          set = true
          b.price = parseFloat(b.price) + parseFloat(a.price)
        }
      })
      if(set == false) {
        newMinusData.push({type : a.type, price: parseFloat(a.price)})
      }
    }
  })

  newPlusData.map(a => {
    chartPlusData.push(
      {
        id: a.type,
        label: a.type,
        value: parseFloat(((a.price/totalPlusPrice)*100).toFixed(1)),
        color: "hsl(107, 70%, 50%)",
        price: a.price
      }
    )
  })

  newMinusData.map(a => {
    chartMinusData.push(
      {
        id: a.type,
        label: a.type,
        value: parseFloat(((a.price/totalMinusPrice)*100).toFixed(1)),
        color: "hsl(107, 70%, 50%)",
        price: a.price
      }
    )
  })

  chartPlusData=
  chartPlusData.sort((a,b) => {
    if(a.value > b.value) return -1
    if(a.value === b.value) return 0
    if(a.value < b.value) return 1
  })

  chartMinusData=
  chartMinusData.sort((a,b) => {
    if(a.value > b.value) return -1
    if(a.value === b.value) return 0
    if(a.value < b.value) return 1
  })

}


const MyPlusResponsivePie = memo(({ chartPlusData }) => (
  <ResponsivePie
      data={chartPlusData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'blues' }}
      borderWidth={1}
      borderColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  0.2
              ]
          ]
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  2
              ]
          ]
      }}
      motionConfig="stiff"
      legends={[
          {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemTextColor: '#000'
                      }
                  }
              ]
          }
      ]}
  />
))

const MyMinusResponsivePie = memo(({ chartMinusData }) => (
  <ResponsivePie
      data={chartMinusData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'reds' }}
      borderWidth={1}
      borderColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  0.2
              ]
          ]
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  2
              ]
          ]
      }}
      motionConfig="stiff"
      legends={[
          {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemTextColor: '#000'
                      }
                  }
              ]
          }
      ]}
  />
))

let ChartCard = (function({assetBtnCount, chartPlusData, chartMinusData}){

  let cardPlusTemp =
  chartPlusData.map((a,i) => {
    return(
      <div className='main-navbar1 row' style={{paddingLeft:'20px', paddingRight:'20px', borderBottom:'1px solid #eee', cursor:'pointer'}} key={a.id}>
         <div className='col-4' style={{textAlign:'left'}}><div className='blue-badge'>{Math.round(a.value)}%</div></div>
         <div className='col-4' style={{textAlign:'left', marginTop:'auto', marginBottom:'auto'}}>{a.id}</div> 
         <div className='col-4' style={{textAlign:'right', marginTop:'auto', marginBottom:'auto'}}>{(a.price).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</div> 
      </div>
    )
  })

  let cardMinusTemp =
  chartMinusData.map((a,i) => {
    return(
      <div className='main-navbar1 row' style={{paddingLeft:'20px', paddingRight:'20px', borderBottom:'1px solid #eee', cursor:'pointer'}} key={a.id}>
         <div className='col-4' style={{textAlign:'left'}}><div className='red-badge'>{Math.round(a.value)}%</div></div>
         <div className='col-4' style={{textAlign:'left', marginTop:'auto', marginBottom:'auto'}}>{a.id}</div> 
         <div className='col-4' style={{textAlign:'right', marginTop:'auto', marginBottom:'auto'}}>{(a.price).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</div> 
      </div>
    )
  })

  if(assetBtnCount == 1){
    return(cardPlusTemp)
  }else if (assetBtnCount == -1){
    return(cardMinusTemp)
  }
})