<template>
  <div class="card loadingscreen">
    <div class="card-body text-center">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve" width="30" height="30">
    		<rect fill="#24374e" width="15" height="15">
          <animateTransform attributeName="transform" attributeType="XML" type="translate" dur="1.7s" values="0,0;15,0;15,15;0,15;0,0;" repeatCount="indefinite"/>
    		</rect>
    		<rect x="15" fill="#2d4461" width="15" height="15">
          <animateTransform attributeName="transform" attributeType="XML" type="translate" dur="1.7s" values="0,0;0,15;-15,15;-15,0;0,0;" repeatCount="indefinite"/>
    		</rect>
    		<rect x="15" y="15" fill="#334f72" width="15" height="15">
          <animateTransform attributeName="transform" attributeType="XML" type="translate" dur="1.7s" values="0,0;-15,0;-15,-15;0,-15;0,0;" repeatCount="indefinite"/>
    		</rect>
    		<rect y="15" fill="#375982" width="15" height="15">
          <animateTransform attributeName="transform" attributeType="XML" type="translate" dur="1.7s" values="0,0;0,-15;15,-15;15,0;0,0;" repeatCount="indefinite"/>
    		</rect>
      </svg>
    </div>
    <div class="card-footer text-center">
      <span>Fetching data</span>
    </div>
  </div>
</template>

<script>
  export default{
    name: "Loadingscreen"
  }
</script>
