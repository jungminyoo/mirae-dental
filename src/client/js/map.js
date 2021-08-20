const mapContainer = document.getElementById("map");
const options = {
  center: new kakao.maps.LatLng(34.89624837533376, 128.6298018975294),
  level: 3,
};

const map = new kakao.maps.Map(mapContainer, options);

const imageSrc =
    "https://mirae-dental.s3.amazonaws.com/elements/mirae-marker.svg", // 마커이미지의 주소입니다
  imageSize = new kakao.maps.Size(45, 68), // 마커이미지의 크기입니다
  imageOption = { offset: new kakao.maps.Point(20, 55) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
const markerImage = new kakao.maps.MarkerImage(
  imageSrc,
  imageSize,
  imageOption
);

const markerPosition = new kakao.maps.LatLng(
  34.89624837533376,
  128.6298018975294
);

// 마커를 생성합니다
const marker = new kakao.maps.Marker({
  position: markerPosition,
  image: markerImage,
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
const mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
