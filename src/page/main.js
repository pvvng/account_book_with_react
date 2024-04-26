import '../css/app.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faAngleUp, faFish, faXmark, faLightbulb, faHandsClapping } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState,memo, useMemo } from 'react';
import { appendData, removeData, appendEditData } from '../store.js';

export function Main({page}){

  let userData = useSelector(state => state.userData)
  let editData = useSelector(state => state.editData)
  let dispatch = useDispatch()
  let imogeArr = ['🙈','🙉','🙊']
  let [imoge,setImoge] = useState(0)
  let [menuType, setMenuType] = useState('')
  let menuTitle = (['지출','입력', '수입'])
  let [menuNum, setMenuNum] =useState(0)
  let [opacity, setOpacity] = useState('')
  let [caroselCount, setCaroselCount] = useState(0)
  let [leftArrowHead, setLeftArrowHead] = useState('hide')
  let [rightArrowHead, setRightArrowHead] = useState('')
  let [moveCarosel, setMoveCarosel] = useState(0)
  let arr = new Array(12).fill(0)
  let nowMonthData = userData[(caroselCount+1).toString()]
  let [pBtn, setPBtn] = useState('')
  let [mBtn, setMBtn] = useState('')
  const today = new Date()
  const formattedDate = today.getMonth() + 1
  let randDefault = [
    [faFish,'"죽은 물고기보다 살아있는 물고기가 좋다"','-에이브러헴 링컨-'],
    [faLightbulb,'"대충 흑백 사진에 글 쓰면 명언 같다"','-이병건-'],
    [faHandsClapping,'"일단 박수를 쳐라. 그리고 똥을 싸라"','-찰스 다윈-']]

  let randNum = useMemo(()=>{
    return parseInt(Math.random() * 10) % 3
  },[menuType])

  let [moveEditMenu, setMoveEditMenu] = useState('')
  let [tabMenu, setTabMenu] = useState('hide')
  let [tabBtn1, setTabBtn1] = useState('')
  let [tabBtn2, setTabBtn2] = useState('')
  let [minusOptions, setMinusOptions] = useState(['🍔식비', '🚌교통비','🏦대출','🕶️패션'])
  let [plusOptions, setPlusOptions] = useState(['💰월급','💵부수입','🤑용돈'])

  let [moveSearchBtn, setMoveSearchBtn] = useState(['','hide'])
  let [moveSearchBtnCount, setMoveSearchBtnCount] = useState(1)
  let [searchBtnValue, setSearchBtnValue] = useState('')

  if(localStorage.getItem('minusOptions') == null){
    localStorage.setItem('minusOptions', JSON.stringify(minusOptions))
  }
  if(localStorage.getItem('plusOptions') == null){
    localStorage.setItem('plusOptions', JSON.stringify(plusOptions))
  }

  if(localStorage.getItem('nowMonthData') == null){
    localStorage.setItem('nowMonthData', JSON.stringify([]))
  }
  else{
    localStorage.setItem('nowMonthData', JSON.stringify(nowMonthData))
  }

  useEffect(()=>{
    if(moveSearchBtnCount % 2 ==  0){
      let copy = [...moveSearchBtn]
      copy[1] = ''
      copy[0] = '300'
      setMoveSearchBtn(copy)
    }else if (moveSearchBtnCount % 2 == 1){
      let copy = [...moveSearchBtn]
      copy[1] = 'hide'
      copy[0] = '50'
      setMoveSearchBtn(copy)
    }
  },[moveSearchBtnCount])

  useEffect(()=>{
    setCaroselCount(formattedDate-1)
    setMoveCarosel(-(formattedDate-1) * 100)
  },[])

  useEffect(()=>{
    let a = setTimeout(() => {
        setOpacity('op2')
    }, 10);
    return ()=>{setOpacity(''); clearTimeout(a)}
  },[page])

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

  return(
    <div className={`op1 ${opacity}`}>
      {/* hidden 분류 수정탭 */}
      <div className={`option-edit-tab-container ${tabMenu}`}>
        <div className='option-edit-tab-white-bg'>
          <button className={`option-edit-tab-btn ${tabBtn1}`} onClick={()=>{
            setTabBtn1('focused-tab-btn')
            setTabBtn2('')
          }}>분류(수입)</button>
          <button className={`option-edit-tab-btn ${tabBtn2}`} onClick={()=>{
            setTabBtn2('focused-tab-btn')
            setTabBtn1('')
          }}>분류(지출)</button>
          <button className='btn btn-secondary' style={{float:'right', padding:'5px', paddingLeft:'0px', paddingRight:'0px'}} onClick={()=>{
            setTabMenu('hide')
            setTabBtn2('')
            setTabBtn1('')
          }}>창닫기</button>
          <div className='option-edit-tab-content'>
            {
              <TabMenu setTabBtn1={setTabBtn1} setTabBtn2={setTabBtn2} setTabMenu={setTabMenu} tabBtn1={tabBtn1} tabBtn2={tabBtn2} />
            }
          </div>
        </div>
      </div>

      {/* hidden + menubar */}
      <div className={`plus-menu ${menuType}`}>
        <div className='main-navbar1'>
            <div className='row'>
                <div className='col-4' style={{textAlign:'left', cursor:'pointer'}} onClick={()=>{
                    setMenuType('')
                    setMenuNum(0)
                    setPBtn('')
                    setMBtn('')
                }}>
                    <FontAwesomeIcon icon={faAngleUp} style={{transform:'rotate(-90deg)'}}/>
                    <span>돌아가기</span>
                </div>
                <div className='col-4'><span style={{fontSize:'20px', fontWeight:'bold'}}>{menuTitle[menuNum+1]}</span></div>
                <div className='col-4'></div>
            </div>    
        </div>
        <div className='main-navbar1'>
            <div className='menuBtnGrid'>
                <button className={`menu-btn ${pBtn}`} tabIndex={-1} onClick={()=>{
                    setMenuNum(1)
                    setPBtn('plusBtn')
                    setMBtn('')
                }}>{menuTitle[2]}</button>
                <button className={`menu-btn ${mBtn}`} tabIndex={-1} onClick={()=>{
                    setMenuNum(-1)
                    setPBtn('')
                    setMBtn('minusBtn')
                }}>{menuTitle[0]}</button>
            </div>    
        </div>
        {
            menuNum == 0?
            <div className='container'>
              <FontAwesomeIcon className='default-menu' icon={randDefault[randNum][0]}/>
              <h2 style={{marginTop:'20px', marginBottom:'20px'}}>{randDefault[randNum][1]}</h2>
              <h5>{randDefault[randNum][2]}</h5>
              <button className='btn btn-secondary' style={{width:'155px', marginTop:'20px'}} onClick={()=>{
                setTabMenu('')
              }}>분류/자산 수정하기</button>
            </div>
            :
            menuNum == 1?
            <Menu minusOptions={minusOptions} plusOptions={plusOptions} setTabMenu={setTabMenu} setMBtn={setMBtn} setPBtn={setPBtn} menuNum={menuNum} setMenuNum={setMenuNum} setMenuType={setMenuType} dispatch={dispatch} />:
            <Menu minusOptions={minusOptions} plusOptions={plusOptions} setTabMenu={setTabMenu} setMBtn={setMBtn} setPBtn={setPBtn} menuNum={menuNum} setMenuNum={setMenuNum} setMenuType={setMenuType} dispatch={dispatch} />
        }
      </div>

      {/* hidden card edit */}
      {
        editData.length != 0 ?
        <EditMenu nowMonthData={nowMonthData} caroselCount={caroselCount} dispatch={dispatch} moveEditMenu={moveEditMenu} setMoveEditMenu={setMoveEditMenu} editData={editData} userData={userData}/>
        :null
      }

      {/* namabar */}
      <div className='main-navbar1 title'>   
        <span style={{fontSize:'24px',}}>{imogeArr[imoge]}</span>
        <span onClick={()=>{
          if(imoge < 2){
            setImoge(imoge+1);
          }else{
            setImoge(0)
          }
        }}>불편한 가계부</span>
        <span style={{fontSize:'24px'}}>{imogeArr[imoge]}</span>
        <p className='today-date'>{today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}일</p>
      </div>

      {/* carosel */}
      <div style={{overflow:'hidden'}}>
        <div style={{width:'1250vw'}}>
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

      {/* plusbtn, seatchbtn */}
      
      <button className='btn-secondary row main-search-btn' style={{width:`${moveSearchBtn[0]}px`}} onClick={(e)=>{
        if(e.target.className != 'move-main-search-btn-hidden-input '){
          setMoveSearchBtnCount(moveSearchBtnCount+1)
        }
      }}>
        <input className={`move-main-search-btn-hidden-input ${moveSearchBtn[1]}`} placeholder='검색어를 입력하세요'
        onChange={(e)=>{
          setSearchBtnValue(e.target.value)
        }}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{margin:'auto'}}/>
      </button>
      <button className='btn-danger main-plus-btn' style={{fontSize:'30px'}} onClick={()=>{
          setMenuType('move-plus-menu')
      }}>+</button>
      

      {/* content */}
      <div className='main-content'>
        {
          <MainCard searchBtnValue={searchBtnValue} nowMonthData={nowMonthData} setMoveEditMenu={setMoveEditMenu} dispatch={dispatch} />
        }
      </div>

      {/* shadowbox */}
      <div style={{width:'100%', height:'200px', backgroundColor:'#eee'}}></div>
    </div>
  )
}

let TabMenu = memo(function({setTabBtn1, setTabBtn2, setTabMenu, tabBtn1, tabBtn2}){
  let [plusOptions, setPlusOptions] = useState(JSON.parse(localStorage.getItem('plusOptions')))
  let [minusOptions, setMinusOptions] = useState(JSON.parse(localStorage.getItem('minusOptions')))

  if(tabBtn1 == 'focused-tab-btn' &&tabBtn2 == ''){
    return(
      <div>
          <button style={{float:'right'}} onClick={()=>{
            setTabMenu('hide')
            setTabBtn2('')
            setTabBtn1('')
            
            let copy = plusOptions.filter(x => x !== '')
            setPlusOptions(copy)

            localStorage.removeItem('plusOptions')
            localStorage.setItem('plusOptions', JSON.stringify(copy))
            // console.log(1)
            alert('저장되었습니다')
          }}>저장하기</button>
        <h4 style={{width:'120px'}}>현재 수입 옵션</h4>
        <p style={{marginTop:'5px', color:'grey', fontSize:'12px'}}>옵션을 삭제하려면 칸을 공백으로 만드세요</p>
        {
          plusOptions.map((a,i) => {
            return(
              <div key={a}>
                <input className='option-input' defaultValue={a} tabIndex={i+1}
                onBlur = {(e) => {
                  let copy = [...plusOptions]
                  copy[i] = (e.target.value)
                  setPlusOptions(copy)
                }}
                />
              </div>  
            )
          })
        }
        <button style={{marginTop:'5px'}} tabIndex={plusOptions.length+1}  onClick={()=>{
          let copy = [...plusOptions]
          copy.push('')
          setPlusOptions(copy)
        }}>추가하기</button>
      </div>
    )
  }else if(tabBtn1 == '' && tabBtn2 == 'focused-tab-btn'){
    return(
      <div>
        <button style={{float:'right'}} onClick={()=>{
            setTabMenu('hide')
            setTabBtn2('')
            setTabBtn1('')

            let copy = minusOptions.filter(x => x !== '')
            setMinusOptions(copy)
    
            localStorage.removeItem('minsOptions')
            localStorage.setItem('minusOptions', JSON.stringify(copy))
            alert('저장되었습니다')
          }}>저장하기</button>
        <h4 style={{width:'120px'}}>현재 지출 옵션</h4>
        <p style={{marginTop:'5px', color:'grey', fontSize:'12px'}}>옵션을 삭제하려면 칸을 공백으로 만드세요</p>
          {
            minusOptions.map((a,i) => {
              return(
                <div key={a}>
                  <input className='option-input' defaultValue={a} tabIndex={i+1}
                    onBlur = {(e) => {
                      let copy = [...minusOptions]
                      copy[i] = (e.target.value)
                      setMinusOptions(copy)
                    }}
                  />
                </div>  
              )
            })
          }
          <button style={{marginTop:'5px'}} tabIndex={minusOptions.length+1} onClick={()=>{
            let copy = [...minusOptions]
            copy.push('')
            setMinusOptions(copy)
          }}>추가하기</button>
        </div>
    )
  }else{
    return(<div>버튼을 클릭하세요</div>)
  }
})


let MainCard = memo(function({searchBtnValue, nowMonthData, setMoveEditMenu, dispatch}){  

  let moveArr = new Array(nowMonthData.length).fill(0)
  let arr1 = []
  let arr2 = []
  let newMonthData = new Array(nowMonthData.length).fill(0)
  let nmd = JSON.parse(localStorage.getItem('nowMonthData'))

  nmd.map((a) => {
    arr1.push(Object.keys(a)[0])
    arr2 = [...arr1]
    arr2 = arr2.sort((a,b) => b-a)

    arr1.map((a,i)=>{
      arr2.map((b,j)=>{
        if(a==b){
          moveArr[i] = [a,b,j-i]
        }
      })
    })
  })

  moveArr.map((a,i) => {
    newMonthData[a[2]+i] = nmd[i] 
  })

  let totalPriceP = 0
  let totalPriceM = 0

  
  let template = 
  newMonthData.map(a => {
    for(let i = 1; i < 32; i++){
      if(a[i.toString()] != undefined){
        let nmd = a[i.toString()]
        let plusPrice = (0);
        let minusPrice = (0);
        let touchBoxHeight = ((a[i.toString()].length * 60 + 59))

        return (
          <div key={i}>
            <div className='touch-box' style={{height: `${touchBoxHeight}px`}} onClick={()=>{
              setMoveEditMenu('move-edit-menu')
              dispatch(appendEditData(a))
            }}></div>
            <div style={{marginBottom:'10px', width:'100%'}}> 
              {/* head */}
              <div className='main-navbar1 row'>
                <div className='col-4' style={{textAlign:'left'}}>
                  <span className='date-prettier'>{i}</span>
                </div>
                <div className='col-4' style={{textAlign:'right', marginTop:'auto', marginBottom:'auto', color:'rgb(66, 66, 255)'}}>
                  {nmd.map(a=>{
                    if(a.status == 1){
                      plusPrice = plusPrice + parseFloat(a.price)
                      totalPriceP = totalPriceP + parseFloat(a.price)
                    }
                  })}
                  {(plusPrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                <div className='col-4' style={{textAlign:'right', marginTop:'auto', marginBottom:'auto', color:'rgb(249, 73, 73)'}}>
                  {nmd.map(a=>{
                    if(a.status == -1){
                      minusPrice = minusPrice + parseFloat(a.price)
                      totalPriceM = totalPriceM + parseFloat(a.price)
                    }
                  })}
                  {(minusPrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </div>
              </div>
              <hr style={{color:'#eee'}}/>
            
              {/* body */}
              {
                nmd.map((a,i)=>{
                  if(searchBtnValue != ''){
                    if(a.type.includes(searchBtnValue) || a.asset.includes(searchBtnValue) || a.content.includes(searchBtnValue) || a.price.includes(searchBtnValue)){
                      return(
                        <div className='main-navbar1 row' key={i}>
                          <div className='col-4' style={{marginTop:'auto', marginBottom:'auto', textAlign:'left'}}>{a.type}</div>
                          <div className='col-4' style={{marginTop:'auto', marginBottom:'auto', textAlign:'left'}}>
                            <p style={{fontWeight:'bold'}}>{a.content}</p>
                            <p style={{color:'grey', fontSize:'14px'}}>{a.asset}</p>
                          </div>
                          <div className='col-4' style={{marginTop:'auto', marginBottom:'auto', textAlign:'right'}}>
                            <span style={{color: a.color}}>{parseFloat(a.price).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</span>
                          </div>
                        </div>      
                      )
                    }
                  }else{
                    return(
                      <div className='main-navbar1 row' key={i}>
                        <div className='col-4' style={{marginTop:'auto', marginBottom:'auto', textAlign:'left'}}>{a.type}</div>
                        <div className='col-4' style={{marginTop:'auto', marginBottom:'auto', textAlign:'left'}}>
                          <p style={{fontWeight:'bold'}}>{a.content}</p>
                          <p style={{color:'grey', fontSize:'14px'}}>{a.asset}</p>
                        </div>
                        <div className='col-4' style={{marginTop:'auto', marginBottom:'auto', textAlign:'right'}}>
                          <span style={{color: a.color}}>{parseFloat(a.price).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</span>
                        </div>
                      </div>      
                    )
                  }
                })
              }
            </div>
          </div>
        )
      }
    }
  })
  return(
    <>
      {/* assetbar */}
      <div className='main-navbar1'>
        <div className='row'>
          <div className='col-4' key='수입'>
            <p>수입</p>
            <p style={{color:'rgb(66, 66, 255)'}}>
              {totalPriceP.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </div>
          <div className='col-4' key='지출'>
            <p>지출</p>
            <p style={{color:'rgb(249, 73, 73)'}}>
              {totalPriceM.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </div>
          <div className='col-4' key='합계'>
            <p>합계</p>
            <p>{(totalPriceP - totalPriceM).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
          </div>
        </div>
      </div>
      <hr/>
      {template}
    </>
  )
})


let EditMenu = memo(function({caroselCount, dispatch, moveEditMenu, setMoveEditMenu, editData, nowMonthData}){

  let date = ((Object.keys(editData[0])[0]))

  return(
    <div className={`edit-menu-container ${moveEditMenu}`}>
      {/* top */}
      <div className='edit-menu-top row'>
        <div className='col-4' style={{textAlign:'left', cursor:'pointer', marginTop:'auto', marginBottom:'auto'}} onClick={()=>{
          setMoveEditMenu('')
        }}>
          <FontAwesomeIcon icon={faAngleUp} style={{transform:'rotate(-90deg)'}}/>
          <span>돌아가기</span>
        </div>
        <div className='col-4'>
          <p style={{fontWeight:'bold', fontSize:'20px'}}>편집</p>
        </div>
        <div className='col-4'></div>
      </div>
      {/* content */}
        <div className='edit-menu-content'> 
          <p className='title'>{date}일</p>
        {
          editData[0][date].map((a,i) => {
            let 월 = (caroselCount+1)
            let 상태
            let 상태색

            if(a.status == 1){상태 = '수입'; 상태색 = 'rgb(66, 66, 255)'}
            else if(a.status == -1){상태 = '지출'; 상태색 = 'rgb(249, 73, 73)'}
            return(
              <div style={{textAlign:'left', width:'100%', backgroundColor:'white', padding:'10px', marginBottom:'5px'}} key={i}>
                <h3 style={{color:`${상태색}`}}>{상태}</h3>
                <p>금액 : {a.price}원</p>
                <p>분류 : {a.type}</p>
                <p>자산 : {a.asset}</p>
                <p>내용 : {a.content}</p>
                <button className='btn btn-secondary' style={{ marginTop:'10px', marginBottom:'10px', padding:'5px', paddingLeft:'0px', paddingRight:'0px'}} onClick={()=>{

                  nowMonthData.map(nmd => {
                    if(nmd[date] != undefined){
                      nmd[date].map( dd => {
                        if(Object.entries(dd).toString() === Object.entries(a).toString()){
                          let arr = nmd[date].filter(x => Object.entries(x).toString() !== Object.entries(a).toString())
                          if(arr.length == 0){
                            dispatch(removeData([caroselCount+1,0,date]))
                          }else{
                            dispatch(removeData([caroselCount+1, arr, date]))
                          }
                        }
                      })
                    }
                  })
                  setMoveEditMenu('')
                  alert('삭제되었습니다.')
                }}>삭제하기</button>
              </div>
            )
          })
        }
        </div>
      </div>
  )
})

function Menu({minusOptions, plusOptions, setTabMenu, menuNum, setMenuNum, setMenuType, dispatch, setPBtn, setMBtn}){
    let [item] = useState(['날짜','금액', '분류', '자산', '내용'])
    let buttonType = ['danger','secondary', 'primary']
    let [psudo, setPsudo] = useState(0)
    let [nowId, setNowId] = useState(-1)
    let [arr, setArr] = useState([0,0,0,0,0,0])
    let [nowMenu, setNowMenu] = useState(-1)
    let [text, setText] = useState()

    return(
        <>
            <div className='container'>  
                <p style={{fontSize:'14px'}}><span style={{color:'red'}}>*</span>은 필수 입력 값입니다.</p>
                <div className='input-box'>
                    <label htmlFor={item[0]}><span style={{color:'red'}}>*</span>{item[0]}</label>
                    <input type='date' placeholder={`${arr[0]}월 ${arr[1]}일`} required aria-required="true" className='menu-input' id={item[0]}
                    onChange={(e)=>{
                      let month = e.target.value.slice(5,7)
                      let date= e.target.value.slice(8,10)
                      let copy = [...arr]
                      copy[0]=parseFloat(month)
                      copy[1]=parseFloat(date)
                      setArr(copy)
                    }}
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor={item[1]}><span style={{color:'red'}}>*</span>{item[1]}</label>
                    <input className='menu-input' style={{width:'79%'}} value={text||''} placeholder='숫자만 입력(단위 : 원)' id={item[1]}
                    onFocus={(e)=>{setNowId(e.target.id)}}
                    onInput={(e)=>{
                      const regex = /^[0-9]*$/
                      if (regex.test(e.target.value)){
                        setPsudo(e.target.value)
                        setText(e.target.value)
                      }else{
                        e.preventDefault()
                        setText('')
                        alert('숫자만 입력하세요')
                      }
                    }}
                    onBlur={()=>{
                        let copy = [...arr]
                        copy[2]=psudo
                        setArr(copy)
                    }}
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor={item[2]}>{item[2]}</label>
                    <select className='menu-input' id={item[2]} defaultValue='---'
                    onFocus={(e)=>{
                      setNowId(e.target.id); setNowMenu(2)
                    }}
                    onInput={(e)=>{setPsudo(e.target.value)}}
                    onBlur={()=>{
                        let copy = [...arr]
                        copy[3]=psudo
                        setArr(copy)
                    }}
                    >
                      <Options menuNum={menuNum} minusOptions={minusOptions} plusOptions={plusOptions} />
                    </select>
                </div>
                <div className='input-box'>
                    <label htmlFor={item[3]}>{item[3]}</label>
                    <select className='menu-input' id={item[3]} defaultValue='---'
                    onFocus={(e)=>{
                      setNowId(e.target.id); setNowMenu(3)
                    }}
                    onInput={(e)=>{setPsudo(e.target.value)}}
                    onBlur={()=>{
                        let copy = [...arr]
                        copy[4]=psudo
                        setArr(copy)
                    }}
                    >
                      <option disabled>---</option>
                      <option>현금</option>
                      <option>은행</option>
                    </select>
                </div>
                <div className='input-box'>
                    <label htmlFor={item[4]}>{item[4]}</label>
                    <input className='menu-input' id={item[4]}
                    onFocus={(e)=>{
                      setNowId(e.target.id)
                    }}
                    onInput={(e)=>{setPsudo(e.target.value)}}
                    onBlur={()=>{
                        let copy = [...arr]
                        copy[5]=psudo
                        setArr(copy)
                    }}
                    />
                </div>
                
                <button className={`btn btn-${buttonType[menuNum+1]}`} style={{margin:'10px'}} onClick={(e)=>{
                  if(arr[1] == 0 && arr[1] == 0){
                    e.preventDefault()
                    alert ('날짜는 필수 입력값입니다.')
                  }else if (arr[2] == 0){
                    e.preventDefault()
                    alert ('금액은 필수 입력값입니다.')
                  }else{
                    setMenuType('')
                    setMenuNum(0)
                    setPBtn('')
                    setMBtn('')
                    addValue(menuNum,arr,dispatch)
                  }
                }}>저장하기</button>

            </div>
        </>
    )
}

let Options = memo(function({menuNum, minusOptions, plusOptions}){

  let mo = JSON.parse(localStorage.getItem('minusOptions')) 
  let po = JSON.parse(localStorage.getItem('plusOptions')) 

  switch (menuNum){
    case -1:
      return(
      <>
        <option disabled>---</option>
        {
          mo.map(a => {
            return(
              <option key={a}>{a}</option>
            )
          })
        }
      </>   
    )
    case 1:
      return(
      <>
        <option disabled>---</option>
        {
          po.map(a=>{
            return(
              <option key={a}>{a}</option>
            )
          })
        }
      </>
    )  
  }
})

function addValue(상태, 값, dispatch){
  let menuNum = 상태
  let arr = 값

  let month = parseFloat(arr[0])
  let date = parseFloat(arr[1])
  let textColor
  if (menuNum == 1){
    textColor = 'rgb(66, 66, 255)'
  }else if(menuNum == -1){
    textColor = 'rgb(249, 73, 73)'
  }

  let value = {[date]:[{status: menuNum, price:arr[2], type:arr[3], 
    asset:arr[4], content:arr[5], color:textColor}]}
  
  let data = [ month, date, value ]
  dispatch(appendData(data))
}