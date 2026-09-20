export default function OrbitFoxMark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox="0 0 320 300" role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path className="fox-deep" d="M42 36 132 78 79 129Z" />
        <path className="fox-blue" d="m278 36-90 42 53 51Z" />
        <path className="fox-mid" d="m42 36 37 93 81-51Z" />
        <path className="fox-cyan" d="m278 36-37 93-81-51Z" />
        <path className="fox-blue" d="m79 129 81-51-25 112Z" />
        <path className="fox-mid" d="m241 129-81-51 25 112Z" />
        <path className="fox-deep" d="m79 129 56 61-27 53Z" />
        <path className="fox-blue" d="m241 129-56 61 27 53Z" />
        <path className="fox-cyan" d="m135 190 25-112 25 112-25 42Z" />
        <path className="fox-paper" d="m108 243 52-11 52 11-52 34Z" />
        <circle cx="120" cy="157" r="5" fill="white" stroke="none" />
        <circle cx="200" cy="157" r="5" fill="white" stroke="none" />
      </g>
    </svg>
  );
}
