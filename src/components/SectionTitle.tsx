interface Title {
  title: string; 
  icon?: String;
}

export const SectionTitle: React.FC<Title> = ({ title, icon }) => {
  return (
    <div className='text-stone-500 bg-white opacity-80 mt-10 flex justify-center items-center gap-2 py-4 shadow-lg rounded-lg w-80 h-20'>
      <div className=''>
        <i className={`fa-solid fa-${icon}`}></i>
      </div>
      <span>{title}</span>
    </div>
  );
};

export default SectionTitle;
