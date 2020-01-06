const svg = p => `
  <svg viewBox="0 0 1356 466" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M120.429 264.52C144.392 264.52 159.753 252.159 165.283 218.167L191.704 50.679C196.619 16.687 180.644 3.09019 154.223 3.09019H73.1177L0 462.91H57.7569L89.093 264.52H120.429ZM123.501 50.061H127.802C132.718 50.061 134.561 53.7692 133.332 60.5676L109.984 207.042C108.141 214.459 106.297 215.695 101.382 215.695H97.0807L123.501 50.061Z" fill="white"/>
  <path d="M258.509 49.443H263.424C267.726 49.443 269.569 52.5331 268.34 59.3315L247.449 190.973C245.606 199.008 244.377 199.626 240.076 199.626H234.546L258.509 49.443ZM192.765 462.91L226.558 251.541H230.859C235.16 251.541 238.233 252.777 236.389 260.194L206.896 447.459C205.668 454.257 206.282 459.82 208.74 462.91H265.268V461.674C264.039 458.584 264.039 453.021 265.268 446.223L295.99 253.395C299.062 229.91 288.002 220.639 280.629 216.931C292.303 212.605 302.134 202.716 306.435 180.467L327.94 45.1167C332.856 16.0689 316.266 3.09019 293.532 3.09019H208.125L135.008 462.91H192.765Z" fill="white"/>
  <path d="M465.977 71.0743C472.736 28.4297 454.917 0 408.834 0H400.232C355.993 0 340.632 28.4297 333.873 71.0743L282.261 395.544C275.502 440.042 295.164 466 339.403 466H348.005C389.787 466 406.991 438.188 413.75 401.106L465.977 71.0743ZM354.15 399.87C352.921 407.904 350.463 411.613 346.776 411.613C340.018 411.613 339.403 407.286 341.246 399.87L394.702 63.6578C395.931 56.8594 398.389 53.1512 402.076 53.1512C406.991 53.1512 408.834 56.8594 407.605 63.6578L354.15 399.87Z" fill="white"/>
  <path d="M414.023 462.91H502.502C531.38 462.91 545.512 444.987 552.271 404.814L607.57 55.0053C614.329 17.305 592.209 3.09019 565.789 3.09019H487.141L414.023 462.91ZM536.91 52.5331H542.44C549.199 52.5331 549.813 56.8594 547.97 64.2758L493.9 401.724C492.057 409.141 491.442 412.231 484.683 412.231H479.768L536.91 52.5331Z" fill="white"/>
  <path d="M626.978 466C669.374 466 687.192 440.042 692.722 405.432L756.624 3.09019H697.023L634.351 401.106C632.508 408.523 631.279 410.377 626.978 410.377C622.677 410.377 620.219 408.523 622.062 401.106L684.735 3.09019H625.749L561.848 404.814C556.318 440.042 574.136 466 618.376 466H626.978Z" fill="white"/>
  <path d="M766.157 413.467C759.398 413.467 760.627 408.523 761.241 404.196L815.926 61.1857C817.769 53.1512 818.384 51.2971 822.685 51.2971C829.444 51.2971 828.215 56.8594 827.6 61.1857L805.481 199.626H862.623L884.743 59.9496C891.502 20.3952 870.611 0 831.901 0H822.685C778.446 0 763.085 22.8674 756.326 64.2758L702.87 399.252C696.111 439.424 712.701 466 758.784 466H768C812.239 466 825.143 435.716 830.058 404.196L854.635 248.451H798.107L773.53 403.578C771.687 411.613 770.458 413.467 766.157 413.467Z" fill="white"/>
  <path d="M852.024 462.91H909.781L973.682 58.0955H1000.1L1008.7 3.09019H899.336L890.119 58.0955H915.925L852.024 462.91Z" fill="white"/>
  <path d="M1075.33 3.09019H1017.57L944.453 462.91H1002.21L1075.33 3.09019Z" fill="white"/>
  <path d="M1206.42 71.0743C1213.18 28.4297 1195.36 0 1149.28 0H1140.67C1096.43 0 1081.07 28.4297 1074.32 71.0743L1022.7 395.544C1015.94 440.042 1035.61 466 1079.85 466H1088.45C1130.23 466 1147.43 438.188 1154.19 401.106L1206.42 71.0743ZM1094.59 399.87C1093.36 407.904 1090.9 411.613 1087.22 411.613C1080.46 411.613 1079.85 407.286 1081.69 399.87L1135.14 63.6578C1136.37 56.8594 1138.83 53.1512 1142.52 53.1512C1147.43 53.1512 1149.28 56.8594 1148.05 63.6578L1094.59 399.87Z" fill="white"/>
  <path d="M1227.58 3.09019L1154.47 462.91H1202.39L1249.09 166.252L1228.81 462.91H1283.5L1356 3.09019H1308.69L1267.52 269.464L1287.18 3.09019H1227.58Z" fill="white"/>
  </svg>
`;

export default props => (
  <span className="svg" dangerouslySetInnerHTML={{ __html: svg(props) }} />
)