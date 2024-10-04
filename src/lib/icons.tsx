type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  Spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  Location: (props: IconProps) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"   
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="m12 24-.7-.6C11 23.1 3 16.5 3 9c0-5 4-9 9-9s9 4 9 9c0 7.5-8 14.1-8.3 14.4zm0-22C8.1 2 5 5.1 5 9c0 5.4 5.1 10.5 7 12.3 1.9-1.8 7-6.9 7-12.3 0-3.9-3.2-7-7-7m0 11c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4m0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
      fill="currentColor"
      />
    </svg>
  ),
  Phone: (props: IconProps) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24"
      width="24" height="24" 
      fill="none" 
      stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92"
      />
    </svg>
  ),
  ThumbsUp: (props: IconProps) => (
    <svg 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>

      <path d="M7 10v12m8-16.12L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/>
    </svg>
  ),
  Lens: (props: IconProps) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 32 32"
      width="800" height="800"
    //   stroke="currentColor"
      fill="currentColor"
      {...props}
    >
        <path d="M0 13.024Q0 10.4 1.024 7.968t2.784-4.16 4.16-2.752T13.024 0q2.656 0 5.056 1.056t4.16 2.752 2.784 4.16 1.024 5.056q0 3.616-1.984 6.816l7.072 7.04q.864.896.864 2.144t-.864 2.112-2.144.864-2.112-.864l-7.04-7.04q-3.2 1.952-6.816 1.952-2.656 0-5.056-1.024t-4.16-2.784-2.784-4.128T0 13.024m4 0q0 2.464 1.216 4.544t3.296 3.264 4.512 1.216q1.824 0 3.488-.704t2.88-1.92 1.92-2.88.736-3.52-.736-3.52-1.92-2.848-2.88-1.92T13.024 4q-2.432 0-4.512 1.216T5.216 8.512 4 13.024"
        />
    </svg>
  ),
  Buy: (props: IconProps) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      xmlSpace="preserve"
      viewBox="0 0 32 32"
      width="800" height="800"
      fill="currentColor" 
    //   stroke="currentColor"
      {...props}
    >
      <path d="M16 28a2 2 0 1 1-3.999.001A2 2 0 0 1 16 28m9-2a2 2 0 1 0-.001 3.999A2 2 0 0 0 25 26m2-5H12.281l.5 2H27a1 1 0 1 1 0 2H12a1 1 0 0 1-.97-.757L6.219 5H2a1 1 0 1 1 0-2h5a1 1 0 0 1 .97.757L8.78 7H30a.998.998 0 0 1 .97 1.243l-3 12A1 1 0 0 1 27 21m-5-11a1 1 0 1 0 2 0 1 1 0 0 0-2 0m-4 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0m-4 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0m-2 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m2 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m2 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m2-4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m2 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m2-4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m2 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m2-4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m1-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
    </svg>
  ),
};