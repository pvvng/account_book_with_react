import { useEffect, useState, memo, useMemo } from 'react';
import '../css/app.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux'
import { editOptionsData, initialOptionsData } from '../store.js';

export function Asset(){
  let userData = useSelector(state => state.userData)
  let optionsData = useSelector(state => state.optionsData)
  let [caroselCount, setCaroselCount] = useState(0)
  let [moveCarosel, setMoveCarosel] = useState(0)
  let [leftArrowHead, setLeftArrowHead] = useState('hide')
  let [rightArrowHead, setRightArrowHead] = useState('')
  const today = new Date()
  const formattedDate = today.getMonth() + 1
  let arr = new Array(12).fill(0)
  let nowMonthData = userData[(caroselCount+1).toString()]
  let [opacity, setOpacity] = useState('')
  let dispatch = useDispatch()

  assetPrice(nowMonthData)

  let totalPlusPrice = assetPrice(nowMonthData)[0]
  let totalMinusPrice = assetPrice(nowMonthData)[1]

  let [movingBtn, setMovingBtn] =  useState('')
  let [movingBtnCount, setMovingBtnCount] = useState(0)
  let [movingBtnText, setMovingBtnText] = useState('예산')

  let plusOptions = JSON.parse(localStorage.getItem('plusOptions'))
  let minusOptions = JSON.parse(localStorage.getItem('minusOptions'))

  let [assetPlusOption,setAssetPlusOption] = useState([])
  let assetMinusOption = []
  // 예산 저장 어레이

  let [assetHiddenMenu, setAssetHiddenMenu] = useState('hide')

  useEffect(()=>{
    if(movingBtn == 'move-asset-moving-btn2'){
      setMovingBtnText('예산')
      setMovingBtnCount(0)
    }else if (movingBtn == 'move-asset-moving-btn1'){
      setMovingBtnText('자산')
      setMovingBtnCount(1)
    }
  },[movingBtn])

  useEffect(()=>{
    let timer = setTimeout(() => {
        setOpacity('op2')
    }, 10);
    return ()=>{setOpacity(''); clearTimeout(timer)}
  },[])

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


  if(localStorage.getItem('optionsData') == null){
    localStorage.setItem('optionsData', JSON.stringify([]))
  }

  useEffect(()=>{
    setAssetHiddenMenu('hide')
  },[])

  return(
    <div className={`op1 ${opacity}`}>

      {/* hidden asset set */}
      <div className={`hidden-asset-set-black-bg ${assetHiddenMenu}`}>
        <div className='hidden-asset-set-white-content'>
          <div style={{margin:'10px'}} className='row'>
            <div className='col-4' style={{textAlign:'left'}}>
              <button className='btn btn-danger' style={{width:'110px', padding:'10px'}} onClick={()=>{
                setAssetHiddenMenu('hide')
                localStorage.removeItem('optionsData')
                localStorage.setItem('optionsData', JSON.stringify([]))
                dispatch(initialOptionsData())
              }}>예산 초기화</button>
            </div>
            <div className='col-4'>
              <span className='title'>예산 설정</span>
            </div>
            <div className='col-4' style={{textAlign:'right'}}>
              <button className='asset-set-btn' onClick={()=>{
                setAssetHiddenMenu('hide')
                localStorage.removeItem('optionsData')
                localStorage.setItem('optionsData', JSON.stringify(optionsData))
              }}>닫기</button>
            </div>
          </div>
          
          <div style={{backgroundColor:'#eee', padding:'10px'}}>
            <p className='red-badge' style={{marginLeft:'auto', marginRight:'auto'}}>지출</p>
            {
              minusOptions.map((a,i) => {

                return(
                  <div className='row' key={a}>
                    <label className='col-6' style={{marginTop:'auto', marginBottom:'auto'}}>{a}</label>
                    <input className='menu-input col-6' 
                    onBlur={(e)=>{
                      if(assetMinusOption.length == 0){
                        const regex = /^[0-9]*$/;
                        if (regex.test(e.target.value) && (e.target.value != '')){
                          assetMinusOption.push({[e.target.previousSibling.innerText]:e.target.value})
                        }else{
                          alert('숫자를 입력하세요')
                        }
                        
                      }else if (assetMinusOption.length != 0){
                        let status = false

                        assetMinusOption.map(a => {
                          if(a[e.target.previousSibling.innerText] != undefined){
                            status = true
                            a[e.target.previousSibling.innerText] = e.target.value
                          }
                        })
                        if (!status){
                          const regex = /^[0-9]*$/;
                          if (regex.test(e.target.value) && (e.target.value != '')){
                            assetMinusOption.push({[e.target.previousSibling.innerText]:e.target.value})
                          }else{
                            alert('숫자를 입력하세요')
                          }
                        }
                      }
                      assetMinusOption.map(a => {
                        dispatch(editOptionsData(a))
                      })
                    }}
                    />
                  </div>
                )
              })
            }
          </div>
          <div style={{marginTop:'10px',backgroundColor:'#eee', padding:'40px', paddingTop:'10px', paddingBottom:'10px'}}>
            <p className='blue-badge' style={{marginLeft:'auto', marginRight:'auto', width:'80px'}}>설정 예산</p>
            {
              optionsData.map((a,i) => {
                return(
                  <div className='row' style={{marginBottom:'10px'}} key={i}>
                    <div className='col-6' style={{textAlign:'left'}}>{Object.keys(a)}</div>
                    <div className='col-6' style={{textAlign:'right'}}>{a[Object.keys(a)].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

      {/* moving btn */}
      <div className='asset-moving-btn-container'>
        <button className={`col-6 asset-moving-btn ${movingBtn}`}><span>{movingBtnText}</span></button>
        <button className='col-6 asset-default-btn' onClick={()=>{
          setMovingBtn('move-asset-moving-btn2')
        }}>예산</button>
        <button className='col-6 asset-default-btn' onClick={()=>{
          setMovingBtn('move-asset-moving-btn1')
        }}>자산</button>
      </div>

      {/* navbar */}
      <div className='main-navbar1 title'>   
        <span>{movingBtnText}</span>
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

      {/* asset set OR 자산 set */}
      {
        movingBtnCount == 0 ? 
        <AssetSet nowMonthData={nowMonthData} plusOptions={plusOptions} minusOptions={minusOptions} assetPlusOption={assetPlusOption} assetMinusOption={assetMinusOption} totalMinusPrice={totalMinusPrice} totalPlusPrice={totalPlusPrice} setAssetHiddenMenu={setAssetHiddenMenu} />:
        movingBtnCount == 1? <RemainSet nowMonthData={nowMonthData} totalMinusPrice={totalMinusPrice} totalPlusPrice={totalPlusPrice} /> :null 
      }


      {/* shadowbox */}
      <div style={{width:'100%', height:'200px', backgroundColor:'#eee'}}></div>
    </div>
  )
}

function assetPrice (nowMonthData){
  let PlusData = []
  let MinusData = []

  let plusTotalPrice = 0
  let minusTotalPrice = 0

  nowMonthData.map(a => {
    for (let i = 1; i < 32; i++){
      if (a[i.toString()] != undefined){
        a[i.toString()].map(b => {
          if ( b.status == 1 ){
            PlusData.push(b)
          }else if ( b.status == -1 ){
            MinusData.push(b)
          }
        })
      } 
    }
  })

  PlusData.map(a => {
    plusTotalPrice = plusTotalPrice + parseFloat(a.price)
  })
  MinusData.map(a => {
    minusTotalPrice = minusTotalPrice + parseFloat(a.price)
  })

  return([plusTotalPrice, minusTotalPrice])
}

let AssetSet = memo(function({assetMinusOption, nowMonthData, minusOptions, setAssetHiddenMenu}){

  
  let optionsData = JSON.parse(localStorage.getItem('optionsData'))
  let usedAsset = [] //main componet에서 사용한 asset
  let remainAsset = 0 // 남은 자산 (assetMinusOption의 모든 value 값 합한거)

  nowMonthData.map(a => {
    for(let i = 1; i<32; i++){
      if(a[i.toString()]!= undefined){
        let temp = a[i.toString()]
        temp.map(b => {
          if(b.status == -1){
            if(usedAsset.lengh == 0){
              usedAsset.push({[b.type]:parseFloat(b.price)})
            }else{
              let exist = false
              usedAsset.map(c => {
                if(c[b.type] != undefined){
                  exist = true
                  c[b.type] = parseFloat(c[b.type]) + parseFloat(b.price)
                }
              })
              if(!exist){
                usedAsset.push({[b.type]:parseFloat(b.price)})
              }
            }
          }
        })
      }
    }
  })

  let perData = []

  optionsData.map(od => {
    let odKey = Object.keys(od)[0]
    usedAsset.map(ua => {
      let uaKey = Object.keys(ua)[0] 

      if (od[uaKey] != undefined){
        let per = 100 - Math.round(((parseFloat(od[uaKey]) - ua[uaKey])/parseFloat(od[uaKey]))*100)
        perData.push({ type : uaKey, per : per, asset:parseFloat(od[uaKey]), used: ua[uaKey], color:''})
      }
    })
  })

  optionsData.map(od => {
    let odKey = Object.keys(od)[0]
    let status = false
    perData.map( pd => {
      if(pd.type == odKey){
        status = true
      }
    })
    if (!status){
      perData.push({ type: odKey, per: 0, asset: parseFloat(od[odKey]), used: 0, color:''})
    }
  })

  perData.map(pd => {
    if(pd.per >= 100){
      pd.per = 100
      pd.color = 'rgb(249, 73, 73)'
    }
    remainAsset = remainAsset + (pd.asset-pd.used)
  })

  let temp

  if((perData.length) != 0){
    temp = perData.map((a) => {
      return(
        <div className='main-navbar1 row' key={a.type}>
          <div className='col-3' style={{textAlign:'left'}}>
            <p style={{fontSize:'12px', color:'grey'}}>예산 (월별)</p>
            <p>{a.type}</p>
            <h5>{a.asset.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</h5>
          </div>
          <div className='col-9' style={{marginBottom:'auto', marginTop:'auto'}}>
            <div className='progress-bar'>
              <div className='progress-bar-inner' style={{width:`${a.per}%`, backgroundColor: a.color}}>
                <span style={{marginLeft:'3px', marginRight:'3px',position:'absolute', right:'30px', fontWeight:'bold'}}>{a.per}%</span>
              </div>
              <div className='row'>
                <h5 className='col-6' style={{textAlign:'left'}}>사용 금액: {a.used.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</h5>
                <h5 className='col-6' style={{textAlign:'right'}}>남은 예산: {(a.asset - a.used).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</h5>
              </div>
            </div>  
          </div>  
        </div> 
      )
    })
  }

  return(
    <div>
      <div className='asset-set-container row'>
        <div className='col-6' style={{textAlign:'left'}}>
          <p style={{marginBottom:'10px', fontSize:'14px', color:'grey'}}>남은 예산</p>
          <p className='title'>
            {remainAsset.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원
          </p>
        </div>
        <div className='col-6' style={{textAlign:'right'}}>
          <button className='asset-set-btn' onClick={()=>{
            setAssetHiddenMenu('')
          }}>예산 설정</button>
        </div>
      </div>
      {temp}
    </div>
  )
})


let RemainSet = memo(function({nowMonthData, totalMinusPrice, totalPlusPrice}){

  let 현금 = []
  let 은행 = []
  let 현금총액 = 0
  let 은행총액 = 0

  nowMonthData.map(a => {
    for(let i = 1; i < 32; i++){
      if(a[i.toString()] != undefined){
        a[i.toString()].map(b => {
          if(b.asset == '현금'){
            현금.push(b)
          }else if (b.asset == '은행'){
            은행.push(b)
          }
        })
      }
    }
  })

  현금.map(a=>{
    현금총액 = 현금총액 + a.status * (parseFloat(a.price))
  })

  은행.map(a=>{
    은행총액 = 은행총액 + a.status * (parseFloat(a.price))
  })

  현금총액 = 현금총액.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
  은행총액 = 은행총액.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")

  return(
    <div>
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

    <div className='main-navbar1 row' style={{marginTop:'10px'}}>
      <div className='col-6' style={{textAlign:'left'}}>현금</div>
      <div className='col-6' style={{textAlign:'right'}}>{현금총액}원</div>
    </div>
    <div className='main-navbar1 row' style={{marginTop:'10px'}}>
      <div className='col-6' style={{textAlign:'left'}}>은행</div>
      <div className='col-6' style={{textAlign:'right'}}>{은행총액}원</div>
    </div>
    </div>
  )
})