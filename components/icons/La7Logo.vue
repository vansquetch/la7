<template>
  <svg viewBox="0 0 200 60" :class="$attrs.class">
    <!-- Triángulos del logo -->
    <g>
      <!-- Triángulo exterior negro -->
      <path d="M20 10 L40 40 L0 40 Z" fill="#000" />
      <!-- Triángulo naranja -->
      <path d="M15 15 L30 35 L5 35 Z" fill="#ea580c" />
      <!-- Triángulo interior -->
      <path d="M12 20 L25 30 L8 30 Z" fill="#fff" />
    </g>

    <!-- Texto La7 -->
    <text
      x="50"
      y="35"
      font-family="Arial Black"
      font-size="24"
      font-weight="bold"
      fill="#000"
    >
      La7
    </text>

    <!-- Texto MEDIA -->
    <text
      x="100"
      y="35"
      font-family="Arial"
      font-size="16"
      font-weight="normal"
      fill="#666"
    >
      MEDIA
    </text>
  </svg>
</template>
