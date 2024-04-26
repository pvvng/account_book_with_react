# 😈불편한 가계부 README
### [demo](https://pvvng.github.io/hostHousehold/)

## installedlibrary
    npm install @reduxjs/toolkit@1.8.1 react-redux
    npm install react-router-dom@6
    npm i --save @fortawesome/free-solid-svg-icons
    npm install @nivo/core
    npm install animate.css --save

## 1. 개요
- 프로젝트 이름: 불편한 가계부
- 프로젝트 지속기간: 2024.04.14 ~ 2024.04.26
- 개발 환경: Front: React, redux, scss

## 2. 프로젝트 설명
- react와 redux toolkit을 활용하여 사용 가능한 가계부를 만듭니다. 프론트엔드 기술만으로 제작되었으며, 데이터는 localstorage에 저장하는 형식으로 진행하였습니다.
- 최상위 컴포넌트에서 props로 유저 정보를 내려주는 방식에서 불필요한 props 전달이 발생하기에, redux toolkit을 활용하여 필요한 컴포넌트 내부에서만 상태 값을 가져다 사용하고자 노력하였습니다. 
- react의 컴포넌트화로 추후 재사용성과 유지 보수를 고려하였습니다.
- bootstrap 라이브러리의 사용을 배제하였으며, 효율적인 css 파일 작성을 위해 extend, mixin 문법이 사용가능한 scss 를 채택하여 중점적으로 사용하였습니다.

## 3. 이용 방식

### <메인페이지>        
<div>
<img src = 'https://github.com/pvvng/hostHousehold/assets/112927193/d6c7598d-c81f-4a70-be46-19122149d961' width='49%', height='400'/>
<img src = 'https://github.com/pvvng/hostHousehold/assets/112927193/8b1f86b8-ac39-471f-8b35-0368f220731e' width='49%', height='400'/>
</div>

#### [초기화면 & 카드 추가 버튼]
- splash 화면이 잠시 나온뒤 다음 페이지로 이동합니다.
- 하단 + 버튼을 클릭하면 정보를 입력받는 페이지가 나타납니다. 사용자가 input에 입력한 값을 바탕으로 날짜에 맞는 수입 혹은 지출 카드를 생성합니다.

<div>
<img src = 'https://github.com/pvvng/hostHousehold/assets/112927193/6eaf0f2f-055c-4176-a939-c5b00f14a52b' width='49%', height='400'/>
<img src = 'https://github.com/pvvng/hostHousehold/assets/112927193/ecb5a277-9bd1-4786-9fd4-14a11926f145' width='49%', height='400'/>
</div>

#### [월 별 캐러셀 & 옵션 수정 및 삭제]
- 현재 달(month)를 기준으로 캐러셀의 디폴트 위치가 정해지며, 캐러셀을 움직이면 현재 위치에 따른 카드가 출력됩니다.
- select의 옵션 수정 및 삭제가 가능합니다. 옵션 값을 받는 input 태그가 비어있으면 옵션을 삭제합니다.

<div>
<img src = 'https://github.com/pvvng/hostHousehold/assets/112927193/1399334c-e206-4fbb-9ed6-1715ca2de4cc' width='49%', height='400'/>
<img src = 'https://github.com/pvvng/hostHousehold/assets/112927193/669b35bd-a0d4-421c-9a1c-e19371eb30fc' width='49%', height='400'/>
</div>

#### [수입/지출 navbar & 날짜별 카드 생성 & 카드 삭제 기능]
- 같은 날짜로 생성된 카드는 하나의 날짜 카드로 묶여서 생성됩니다. 또한, 생성되는 카드는 느린 날짜 순서대로 정렬됩니다. 캐러셀 아래에 위치한 수입/지출 navbar는 현재 달의 총 수입과 총 지출을 표시합니다.
- 카드를 터치해서 원하는 카드를 삭제할 수 있습니다.

<div align = 'center'>
<img src = 'https://github.com/pvvng/hostHousehold/assets/112927193/5da80e31-4fa4-4ffd-bb62-44a0af8904c1' width='49%', height='400'/>
</div>

#### [검색 버튼]
- 하단 검색 버튼을 클릭하면 숨겨진 input이 나타납니다. 해당 input에 입력받은 값을 바탕으로 현재 생성된 카드 중에서 일치하는 값만을 보여줍니다.

---

### <통계 페이지>

<div align = 'center'>
<img src = 'https://github.com/pvvng/hostHousehold/assets/112927193/077c00d5-d194-477b-8d86-3ab58c09bbe8' width='49%', height='400'/>
</div>

#### [통계 그래프]
- 해당 월에 수입과 지출을 nivo library 그래프로 보여줍니다. 메인 페이지와 마찬가지로, 캐러셀을 움직이면 현재 캐러셀 위치에 맞는 값을 보여줍니다. 

---

### <예산/자산 페이지>

<div>
<img src = 'https://github.com/pvvng/hostHousehold/assets/112927193/d949cc60-8aa4-46f8-bc67-ddee1d009b3f' width='49%', height='400'/>
<img src = 'https://github.com/pvvng/hostHousehold/assets/112927193/83b24cdf-21fc-42a6-ba4e-f1a60e2a13fd' width='49%', height='400'/>
</div>

#### [예산 설정 & 현재 자산]
- 예산/자산 페이지 상단 버튼을 클릭해서 예산 혹은 자산 페이지를 확인 가능합니다.
- 예산 설정 버튼을 통해 사용자가 원하는 예산 설정이 가능하며, 예산을 초과하였으면 진행 바의 색이 붉게 변합니다.
- 자산 페이지에서는 현재 자산이 얼마나 남았으며, 현재 자산 현황을 확인 가능합니다.

## 4. 프로젝트 중 어려웠던 부분

- 데이터 정리가 가장 어려웠습니다. 현업에서 실제로 사용되는 데이터가 어떤 형식인지는 알지 못하는 상태로 해당 프로젝트를 시작했기 때문에 임의로 데이터를 구성하였는데, 처음 구성한 데이터 구조가 굉장히 비효율적이고 복잡했기 때문에 이를 처리하는 것에 상당히 애를 먹었습니다.
- localstorage에 사용자 데이터를 저장할 때 다른 페이지로 이동하고 메인페이지로 다시 이동하면 localstorage가 초기화 되는 문제가 있었습니다. 이를 컴포넌트가 새롭게 mount 되면 state는 초기화 되고, 초기화된 state를 localstorage에 저장하기에 발생하는 문제라고 판단하였고, 개선 방안으로 redux toolkit에 데이터를 저장하고 이를 localstorage에 불가변하게 저장하는 형식으로 변경하여 문제를 해결하였습니다.
- 메인 페이지에서 카드가 일정 갯수 이상 추가되면 메인 페이지의 width가 약간 커지는 문제가 있었습니다. 원인 파악 결과, 이는 스크롤이 추가되면서 뷰포트의 넓이가 달라지고, 달라진 뷰포트의 크기만큼 메인페이지의 width가 커졌기에 발생한 문제라고 판단했습니다. 메인페이지의 width를 calc(100vw - 스크롤 넓이) 를 통해 해결하려고 하였으나 실패하였고, 결국 css에서 body 태그에 직접 접근하여 스크롤 넓이를 조절하는 방식으로 문제를 해결했습니다.

## 4. 후기
### 추후 추가하고 싶은 기능 혹은 느낀 점


✔ 카드를 삭제하는 버튼 뿐 아니라, 카드의 내용을 변경하는 기능을 추가하고 싶습니다.


✔ 실제 BE와 통신하는 구조로 개편하고 싶습니다. 프로젝트를 하면서 데이터를 처리하고 저장할 때마다 통신을 통해서 데이터를 저장했다면 더 효율적인 데이터 저장이 가능했겠다라는 생각이 들었습니다. 후에 개편을 할 기회가 생긴다면 BE 팀원과 함께 하거나, JSON 파일을 이용한 AJEX 통신을 구현하고자 합니다


✔ 큰 그림을 그리는 것이 얼마나 중요한지 알게되었습니다. 프로젝트를 진행하면서 그때 그때마다 생각나는 기능을 추가하다 보니, 프로젝트 후반엔 내가 어떤 기능을 어떻게 추가했는지 기억이 잘 나지 않고, 컴포넌트 구조도 꼬여서 이를 해결하는데 상당히 힘들었던 기억이 있습니다. 다음 프로젝트에서는 먼저 구현할 기능과 react 컴포넌트 구조의 틀을 먼저 짜놓고, 프로젝트를 시작하는 것이 효율적일 것이라 생각합니다. 
