'use client';

import { useState, useRef, useEffect } from 'react';

export default function CVTemplate1() {
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');
  const [education, setEducation] = useState('Your education here');
  const [experience, setExperience] = useState('Your experience here');
  const [skills, setSkills] = useState('Skill 1\nSkill 2');
  const [hobbies, setHobbies] = useState('Hobby 1\nHobby 2');
  const [overview, setOverview] = useState('');
  const [contact, setContact] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  // Translations
  const translations = {
    vi: {
      fullName: 'HỌ VÀ TÊN',
      position: 'Vị trí',
      overview: 'TỔNG QUAN',
      overviewPlaceholder: 'Nhập tổng quan chuyên nghiệp của bạn tại đây',
      contact: 'LIÊN HỆ',
      contactPlaceholder: 'Nhập thông tin liên hệ của bạn tại đây',
      education: 'HỌC VẤN',
      educationPlaceholder: 'Thông tin học vấn của bạn tại đây',
      experience: 'KINH NGHIỆM',
      experiencePlaceholder: 'Kinh nghiệm làm việc của bạn tại đây',
      skills: 'KỸ NĂNG',
      skillsPlaceholder: 'Nhập kỹ năng của bạn tại đây',
      hobbies: 'SỞ THÍCH',
      hobbiesPlaceholder: 'Nhập sở thích của bạn tại đây',
      exportPDF: 'Xuất PDF',
      cvPreview: 'Xem trước CV',
      downloadPDF: 'Tải xuống PDF',
      close: 'Đóng',
      clickToUpload: 'Nhấp để tải lên',
    },
    en: {
      fullName: 'FULL NAME',
      position: 'Position',
      overview: 'OVERVIEW',
      overviewPlaceholder: 'Enter your professional overview here',
      contact: 'CONTACT',
      contactPlaceholder: 'Enter your contact information here',
      education: 'EDUCATION',
      educationPlaceholder: 'Your education here',
      experience: 'EXPERIENCE',
      experiencePlaceholder: 'Your experience here',
      skills: 'SKILLS',
      skillsPlaceholder: 'Enter your skills here',
      hobbies: 'HOBBIES',
      hobbiesPlaceholder: 'Enter your hobbies here',
      exportPDF: 'Export PDF',
      cvPreview: 'CV Preview',
      downloadPDF: 'Download PDF',
      close: 'Close',
      clickToUpload: 'Click to upload',
    },
  };

  const t = translations[language];

  const handleExportPDF = () => {
    setShowPreview(true);
  };

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;

    const html2pdf = (await import('html2pdf.js')).default;
    const element = pdfRef.current;
    const opt = {
      margin: 0,
      filename: `${fullName || 'cv'}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      setShowPreview(false);
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file.');
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Update default values when language changes
  useEffect(() => {
    if (language === 'vi') {
      if (education === 'Your education here') {
        setEducation('Thông tin học vấn của bạn tại đây');
      }
      if (experience === 'Your experience here') {
        setExperience('Kinh nghiệm làm việc của bạn tại đây');
      }
    } else {
      if (education === 'Thông tin học vấn của bạn tại đây') {
        setEducation('Your education here');
      }
      if (experience === 'Kinh nghiệm làm việc của bạn tại đây') {
        setExperience('Your experience here');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isLanguageDropdownOpen && !target.closest('.language-dropdown-container')) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageDropdownOpen]);

  return (
    <div className="min-h-screen bg-[#f3f3f3] relative">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50 language-dropdown-container">
        <div className="relative">
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="bg-[#2DCBD3] hover:bg-[#0099A1] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
          >
            <span>{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
            <svg
              className={`w-4 h-4 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isLanguageDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden min-w-[160px]">
              <button
                onClick={() => {
                  setLanguage('vi');
                  setIsLanguageDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                  language === 'vi' ? 'bg-[#2DCBD3] text-white hover:bg-[#0099A1]' : 'text-gray-800'
                }`}
              >
                Tiếng Việt
              </button>
              <button
                onClick={() => {
                  setLanguage('en');
                  setIsLanguageDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                  language === 'en' ? 'bg-[#2DCBD3] text-white hover:bg-[#0099A1]' : 'text-gray-800'
                }`}
              >
                English
              </button>
            </div>
          )}
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      <div className="max-w-[800px] mx-auto my-10 bg-white shadow-lg border" ref={cvRef}>
      {/* Header */}
      <div className="relative bg-[#2DCBD3] text-white p-6 pb-16">
        <div className="flex flex-col">
          <div className="relative inline-block cursor-pointer group mb-4" onClick={handleImageClick}>
            <img
              src={profileImage || '/profile.jpg'}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover transition-opacity group-hover:opacity-80"
              onError={(e) => {
                // Fallback to a placeholder if image doesn't exist
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiByeD0iNDgiIGZpbGw9IiNEMEQwRDAiLz4KPHBhdGggZD0iTTQ4IDMyQzQ4IDI4LjY4NjMgNTAuNjg2MyAyNiA1NCAyNkM1Ny4zMTM3IDI2IDYwIDI4LjY4NjMgNjAgMzJDNjAgMzUuMzEzNyA1Ny4zMTM3IDM4IDU0IDM4QzUwLjY4NjMgMzggNDggMzUuMzEzNyA0OCAzMlpNNDggNDJDNTEuMzEzNyA0MiA1NCA0NC42ODYzIDU0IDQ4QzU0IDUxLjMxMzcgNTEuMzEzNyA1NCA0OCA1NEM0NC42ODYzIDU0IDQyIDUxLjMxMzcgNDIgNDhDNDIgNDQuNjg2MyA0NC42ODYzIDQyIDQ4IDQyWiIgZmlsbD0iI0ExQTFBMSIvPgo8L3N2Zz4K';
              }}
            />
            <div className="absolute inset-0 w-24 h-24 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
              <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100">{t.clickToUpload}</span>
            </div>
          </div>
          <div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t.fullName}
              className="text-xl font-bold text-gray-100 bg-transparent border-none outline-none placeholder-gray-400 w-full"
            />
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder={t.position}
              className="text-gray-200 text-sm bg-transparent border-none outline-none placeholder-gray-400 w-full"
            />
          </div>
        </div>


        <div className="absolute top-6 left-[280px] text-white font-semibold text-sm">
          {t.overview}
        </div>
        <div className="absolute top-12 left-[280px] right-6">
          <textarea
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            className="text-sm text-white bg-transparent border-none outline-none resize-none w-full min-h-[60px] placeholder-gray-300"
            placeholder={t.overviewPlaceholder}
          />
        </div>

        {/* Contact Section */}
        <div className="absolute top-32 left-[280px] text-white font-semibold text-sm">
          {t.contact}
        </div>
        <div className="absolute top-36 left-[280px] right-6">
          <textarea
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={t.contactPlaceholder}
            className="text-sm text-white bg-transparent border-none outline-none resize-none w-full min-h-[60px] placeholder-gray-300"
          />
        </div>
      </div>

      {/* Middle Section */}
      <div className="relative bg-white p-6">
        {/* Custom angled divider */}
        <div className="absolute top-[-25px] left-0 w-full h-8 bg-[#0099A1] clip-divider"></div>

        <div className="grid grid-cols-2 gap-10 mt-4">
          <div>
            <h2 className="bg-[#2DCBD3] inline-block px-3 py-1 text-white font-semibold text-sm">
              {t.education}
            </h2>
            <textarea
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="mt-2 text-sm text-gray-700 w-full bg-transparent border-none outline-none resize-none min-h-[200px] whitespace-pre-wrap"
            />
          </div>

          <div>
            <h2 className="bg-[#2DCBD3] inline-block px-3 py-1 text-white font-semibold text-sm">
              {t.experience}
            </h2>
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-2 text-sm text-gray-700 w-full bg-transparent border-none outline-none resize-none min-h-[200px] whitespace-pre-wrap"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#2DCBD3] text-white grid grid-cols-2 p-6">
        <div>
          <h3 className="font-bold">{t.skills}</h3>
          <textarea
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="mt-2 text-sm text-white bg-transparent border-none outline-none resize-none min-h-[160px] w-full whitespace-pre-wrap"
            placeholder={t.skillsPlaceholder}
          />
        </div>

        <div>
          <h3 className="font-bold">{t.hobbies}</h3>
          <textarea
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            className="mt-2 text-sm text-white bg-transparent border-none outline-none resize-none min-h-[160px] w-full whitespace-pre-wrap"
            placeholder={t.hobbiesPlaceholder}
          />
        </div>
      </div>
      </div>

      {/* Export PDF Button */}
      <div className="max-w-[800px] mx-auto mt-6 mb-10 flex justify-center">
        <button
          onClick={handleExportPDF}
          className="bg-[#2DCBD3] hover:bg-[#0099A1] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-200"
        >
          {t.exportPDF}
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-gray-800">{t.cvPreview}</h2>
              <div className="flex gap-3">
                <button
                  onClick={handleDownloadPDF}
                  className="bg-[#2DCBD3] hover:bg-[#0099A1] text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  {t.downloadPDF}
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  {t.close}
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="max-w-[800px] mx-auto bg-white shadow-lg border">
                {/* Header */}
                <div className="relative bg-[#2DCBD3] text-white p-6 pb-16">
                  <div className="flex flex-col">
                    <img
                      src={profileImage || '/profile.jpg'}
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-white object-cover mb-4"
                      onError={(e) => {
                        // Fallback to a placeholder if image doesn't exist
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiByeD0iNDgiIGZpbGw9IiNEMEQwRDAiLz4KPHBhdGggZD0iTTQ4IDMyQzQ4IDI4LjY4NjMgNTAuNjg2MyAyNiA1NCAyNkM1Ny4zMTM3IDI2IDYwIDI4LjY4NjMgNjAgMzJDNjAgMzUuMzEzNyA1Ny4zMTM3IDM4IDU0IDM4QzUwLjY4NjMgMzggNDggMzUuMzEzNyA0OCAzMlpNNDggNDJDNTEuMzEzNyA0MiA1NCA0NC42ODYzIDU0IDQ4QzU0IDUxLjMxMzcgNTEuMzEzNyA1NCA0OCA1NEM0NC42ODYzIDU0IDQyIDUxLjMxMzcgNDIgNDhDNDIgNDQuNjg2MyA0NC42ODYzIDQyIDQ4IDQyWiIgZmlsbD0iI0ExQTFBMSIvPgo8L3N2Zz4K';
                      }}
                    />
                    <div>
                      <div className="text-xl font-bold text-gray-100 w-full">
                        {fullName || t.fullName}
                      </div>
                      <div className="text-gray-200 text-sm w-full">
                        {position || t.position}
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-6 left-[280px] text-white font-semibold text-sm">
                    {t.overview}
                  </div>
                  <div className="absolute top-12 left-[280px] right-6">
                    <div className="text-sm text-white w-full min-h-[60px] whitespace-pre-wrap">
                      {overview || t.overviewPlaceholder}
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="absolute top-32 left-[280px] text-white font-semibold text-sm">
                    {t.contact}
                  </div>
                  <div className="absolute top-36 left-[280px] right-6">
                    <div className="text-sm text-white w-full min-h-[60px] whitespace-pre-wrap">
                      {contact || t.contactPlaceholder}
                    </div>
                  </div>
                </div>

                {/* Middle Section */}
                <div className="relative bg-white p-6">
                  {/* Custom angled divider */}
                  <div className="absolute top-[-25px] left-0 w-full h-8 bg-[#0099A1] clip-divider"></div>

                  <div className="grid grid-cols-2 gap-10 mt-4">
                    <div>
                      <h2 className="bg-[#2DCBD3] inline-block px-3 py-1 text-white font-semibold text-sm">
                        {t.education}
                      </h2>
                      <div className="mt-2 text-sm text-gray-700 w-full min-h-[200px] whitespace-pre-wrap">
                        {education}
                      </div>
                    </div>

                    <div>
                      <h2 className="bg-[#2DCBD3] inline-block px-3 py-1 text-white font-semibold text-sm">
                        {t.experience}
                      </h2>
                      <div className="mt-2 text-sm text-gray-700 w-full min-h-[200px] whitespace-pre-wrap">
                        {experience}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="bg-[#2DCBD3] text-white grid grid-cols-2 p-6">
                  <div>
                    <h3 className="font-bold">{t.skills}</h3>
                    <div className="mt-2 text-sm text-white min-h-[160px] w-full whitespace-pre-wrap">
                      {skills || t.skillsPlaceholder}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold">{t.hobbies}</h3>
                    <div className="mt-2 text-sm text-white min-h-[160px] w-full whitespace-pre-wrap">
                      {hobbies || t.hobbiesPlaceholder}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden PDF-ready version that matches preview exactly */}
      <div className="hidden">
        <div className="max-w-[800px] mx-auto bg-white shadow-lg border" ref={pdfRef}>
          {/* Header */}
          <div className="relative bg-[#2DCBD3] text-white p-6 pb-16">
            <div className="flex flex-col">
              <img
                src={profileImage || '/profile.jpg'}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white object-cover mb-4"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiByeD0iNDgiIGZpbGw9IiNEMEQwRDAiLz4KPHBhdGggZD0iTTQ4IDMyQzQ4IDI4LjY4NjMgNTAuNjg2MyAyNiA1NCAyNkM1Ny4zMTM3IDI2IDYwIDI4LjY4NjMgNjAgMzJDNjAgMzUuMzEzNyA1Ny4zMTM3IDM4IDU0IDM4QzUwLjY4NjMgMzggNDggMzUuMzEzNyA0OCAzMlpNNDggNDJDNTEuMzEzNyA0MiA1NCA0NC42ODYzIDU0IDQ4QzU0IDUxLjMxMzcgNTEuMzEzNyA1NCA0OCA1NEM0NC42ODYzIDU0IDQyIDUxLjMxMzcgNDIgNDhDNDIgNDQuNjg2MyA0NC42ODYzIDQyIDQ4IDQyWiIgZmlsbD0iI0ExQTFBMSIvPgo8L3N2Zz4K';
                }}
              />
              <div>
                <div className="text-xl font-bold text-gray-100 w-full">
                  {fullName || 'FULL NAME'}
                </div>
                <div className="text-gray-200 text-sm w-full">
                  {position || 'Position'}
                </div>
              </div>
            </div>

            <div className="absolute top-6 left-[280px] text-white font-semibold text-sm">
              {t.overview}
            </div>
            <div className="absolute top-12 left-[280px] right-6">
              <div className="text-sm text-white w-full min-h-[60px] whitespace-pre-wrap">
                {overview || t.overviewPlaceholder}
              </div>
            </div>

            {/* Contact Section */}
            <div className="absolute top-32 left-[280px] text-white font-semibold text-sm">
              {t.contact}
            </div>
            <div className="absolute top-36 left-[280px] right-6">
              <div className="text-sm text-white w-full min-h-[60px] whitespace-pre-wrap">
                {contact || t.contactPlaceholder}
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div className="relative bg-white p-6">
            {/* Custom angled divider */}
            <div className="absolute top-[-25px] left-0 w-full h-8 bg-[#0099A1] clip-divider"></div>

            <div className="grid grid-cols-2 gap-10 mt-4">
              <div>
                <h2 className="bg-[#2DCBD3] inline-block px-3 py-1 text-white font-semibold text-sm">
                  {t.education}
                </h2>
                <div className="mt-2 text-sm text-gray-700 w-full min-h-[200px] whitespace-pre-wrap">
                  {education}
                </div>
              </div>

              <div>
                <h2 className="bg-[#2DCBD3] inline-block px-3 py-1 text-white font-semibold text-sm">
                  {t.experience}
                </h2>
                <div className="mt-2 text-sm text-gray-700 w-full min-h-[200px] whitespace-pre-wrap">
                  {experience}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bg-[#2DCBD3] text-white grid grid-cols-2 p-6">
            <div>
              <h3 className="font-bold">{t.skills}</h3>
              <div className="mt-2 text-sm text-white min-h-[160px] w-full whitespace-pre-wrap">
                {skills || t.skillsPlaceholder}
              </div>
            </div>

            <div>
              <h3 className="font-bold">{t.hobbies}</h3>
              <div className="mt-2 text-sm text-white min-h-[160px] w-full whitespace-pre-wrap">
                {hobbies || t.hobbiesPlaceholder}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

