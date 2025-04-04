const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (


    <svg className={className} 
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      
      <rect x="6" y="10" width="36" height="32" rx="2" />
      
      <line x1="6" y1="18" x2="42" y2="18" />
      
    
      <line x1="14" y1="4" x2="14" y2="10" />
      
     
      <line x1="34" y1="4" x2="34" y2="10" />
    </svg>
    
  );
};

export default CalendarIcon;