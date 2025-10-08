// components/Waves.jsx
export default function Waves() {
  return (
    <svg
      className="waves"
      width="100%"
      height="600"
      viewBox="0 0 1200 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Línea 1 */}
      <path d="M0,300 C300,200 900,400 1200,300" stroke="#3C6041" strokeWidth="3" fill="none" strokeOpacity="0.1">
        <animateTransform attributeName="transform" type="translate" from="0 0" to="20 0" dur="25s" repeatCount="indefinite"/>
      </path>
      {/* Línea 2 */}
      <path d="M0,350 C300,250 900,450 1200,350" stroke="#2B5E73" strokeWidth="3" fill="none" strokeOpacity="0.08">
        <animateTransform attributeName="transform" type="translate" from="0 0" to="-20 0" dur="30s" repeatCount="indefinite"/>
      </path>
      {/* Línea 3 */}
      <path d="M0,400 C300,300 900,500 1200,400" stroke="#3C6041" strokeWidth="3" fill="none" strokeOpacity="0.09">
        <animateTransform attributeName="transform" type="translate" from="0 0" to="15 0" dur="35s" repeatCount="indefinite"/>
      </path>
      {/* Línea 4 */}
      <path d="M0,450 C300,350 900,550 1200,450" stroke="#2B5E73" strokeWidth="3" fill="none" strokeOpacity="0.07">
        <animateTransform attributeName="transform" type="translate" from="0 0" to="-15 0" dur="28s" repeatCount="indefinite"/>
      </path>
      {/* Línea 5 */}
      <path d="M0,500 C300,400 900,600 1200,500" stroke="#3C6041" strokeWidth="3" fill="none" strokeOpacity="0.08">
        <animateTransform attributeName="transform" type="translate" from="0 0" to="10 0" dur="32s" repeatCount="indefinite"/>
      </path>
    </svg>
  );
}
