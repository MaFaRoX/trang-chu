'use client';

import { useState, useRef, useEffect } from 'react';

export default function CVTemplate4() {
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');
  const [overview, setOverview] = useState('');
  const [contact, setContact] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  // Translations
  const translations = {
    vi: {
      fullName: 'HỌ TÊN',
      position: 'Vị trí ứng tuyển',
      overview: 'TỔNG QUAN',
      overviewPlaceholder: 'Nhập tổng quan chuyên nghiệp của bạn tại đây',
      contact: 'LIÊN HỆ',
      contactPlaceholder: 'ĐIỆN THOẠI: \nWEBSITE: \nEMAIL: ',
      hobbies: 'SỞ THÍCH',
      hobbiesPlaceholder: 'Nhập sở thích của bạn tại đây',
      education: 'HỌC VẤN',
      educationPlaceholder: 'Nhập thông tin học vấn của bạn tại đây',
      experience: 'KINH NGHIỆM',
      experiencePlaceholder: 'Nhập kinh nghiệm làm việc của bạn tại đây',
      skills: 'KỸ NĂNG',
      skillsPlaceholder: 'Nhập kỹ năng của bạn tại đây',
      exportPDF: 'Xuất PDF',
      cvPreview: 'Xem trước CV',
      downloadPDF: 'Tải xuống PDF',
      close: 'Đóng',
      clickToUpload: 'Nhấp để tải lên',
      invalidImage: 'Vui lòng chọn một file hình ảnh hợp lệ.',
    },
    en: {
      fullName: 'FULL NAME',
      position: 'Applied Position',
      overview: 'OVERVIEW',
      overviewPlaceholder: 'Enter your professional overview here',
      contact: 'CONTACT',
      contactPlaceholder: 'PHONE: \nWEBSITE: \nEMAIL: ',
      hobbies: 'HOBBIES',
      hobbiesPlaceholder: 'Enter your hobbies here',
      education: 'EDUCATION',
      educationPlaceholder: 'Enter your education details here',
      experience: 'EXPERIENCE',
      experiencePlaceholder: 'Enter your work experience here',
      skills: 'SKILLS',
      skillsPlaceholder: 'Enter your skills here',
      exportPDF: 'Export PDF',
      cvPreview: 'CV Preview',
      downloadPDF: 'Download PDF',
      close: 'Close',
      clickToUpload: 'Click to upload',
      invalidImage: 'Please select a valid image file.',
    },
  };

  const t = translations[language];

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
        alert(t.invalidImage);
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

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
    <div className="min-h-screen bg-[#f3f3f3] p-8 relative">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50 language-dropdown-container">
        <div className="relative">
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
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
                  language === 'vi' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-800'
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
                  language === 'en' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-800'
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
      
      <div className="max-w-[800px] mx-auto bg-white shadow-lg" ref={cvRef}>
        <div className="flex">
          {/* Left Column - Grey Background */}
          <div className="w-1/3 bg-gray-200 p-6">
            {/* Photo Section */}
            <div className="mb-6">
              <div 
                className="relative inline-block cursor-pointer group"
                onClick={handleImageClick}
              >
                <div className="w-32 h-32 rounded-full border-4 border-blue-300 overflow-hidden bg-gray-300 flex items-center justify-center">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-500 text-xs text-center px-2">
                      <svg className="w-16 h-16 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 w-32 h-32 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100">{t.clickToUpload}</span>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-700 mb-2">{t.overview}</h3>
              <textarea
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                placeholder={t.overviewPlaceholder}
                className="w-full text-xs text-gray-700 bg-transparent border-none outline-none resize-none min-h-[80px] placeholder-gray-400"
              />
            </div>

            {/* Contact Section */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-700 mb-2">{t.contact}</h3>
              <textarea
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={t.contactPlaceholder}
                className="w-full text-xs text-gray-700 bg-transparent border-none outline-none resize-none min-h-[80px] whitespace-pre-wrap placeholder-gray-400"
              />
            </div>

            {/* Hobbies Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-700 mb-2">{t.hobbies}</h3>
              <textarea
                value={hobbies}
                onChange={(e) => setHobbies(e.target.value)}
                placeholder={t.hobbiesPlaceholder}
                className="w-full text-xs text-gray-700 bg-transparent border-none outline-none resize-none min-h-[80px] whitespace-pre-wrap placeholder-gray-400"
              />
            </div>
          </div>

          {/* Right Column - White Background */}
          <div className="w-2/3 bg-white p-6">
            {/* Name and Position */}
            <div className="mb-6">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t.fullName}
                className="text-3xl font-bold text-gray-900 bg-transparent border-none outline-none w-full placeholder-gray-400 mb-1"
              />
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder={t.position}
                className="text-sm text-gray-600 bg-transparent border-none outline-none w-full placeholder-gray-400"
              />
            </div>

            {/* Education Section */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-3 border-b-2 border-gray-300 pb-1">
                {t.education}
              </h2>
              <div className="border-b border-gray-200 mb-3"></div>
              <textarea
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder={t.educationPlaceholder}
                className="w-full text-xs text-gray-700 bg-transparent border-none outline-none resize-none min-h-[200px] whitespace-pre-wrap placeholder-gray-400"
              />
            </div>

            {/* Experience Section */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-3 border-b-2 border-gray-300 pb-1">
                {t.experience}
              </h2>
              <div className="border-b border-gray-200 mb-3"></div>
              <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder={t.experiencePlaceholder}
                className="w-full text-xs text-gray-700 bg-transparent border-none outline-none resize-none min-h-[250px] whitespace-pre-wrap placeholder-gray-400"
              />
            </div>

            {/* Skills Section */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-3 border-b-2 border-gray-300 pb-1">
                {t.skills}
              </h2>
              <div className="border-b border-gray-200 mb-3"></div>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder={t.skillsPlaceholder}
                className="w-full text-xs text-gray-700 bg-transparent border-none outline-none resize-none min-h-[100px] whitespace-pre-wrap placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Export PDF Button */}
      <div className="max-w-[800px] mx-auto mt-6 mb-10 flex justify-center">
        <button
          onClick={handleExportPDF}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-200"
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
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
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
              <div className="max-w-[800px] mx-auto bg-white shadow-lg">
                <div className="flex">
                  {/* Left Column - Grey Background */}
                  <div className="w-1/3 bg-gray-200 p-6">
                    {/* Photo Section */}
                    <div className="mb-6">
                      <div className="relative inline-block">
                        <div className="w-32 h-32 rounded-full border-4 border-blue-300 overflow-hidden bg-gray-300 flex items-center justify-center">
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiByeD0iNDgiIGZpbGw9IiNEMEQwRDAiLz4KPHBhdGggZD0iTTQ4IDMyQzQ4IDI4LjY4NjMgNTAuNjg2MyAyNiA1NCAyNkM1Ny4zMTM3IDI2IDYwIDI4LjY4NjMgNjAgMzJDNjAgMzUuMzEzNyA1Ny4zMTM3IDM4IDU0IDM4QzUwLjY4NjMgMzggNDggMzUuMzEzNyA0OCAzMlpNNDggNDJDNTEuMzEzNyA0MiA1NCA0NC42ODYzIDU0IDQ4QzU0IDUxLjMxMzcgNTEuMzEzNyA1NCA0OCA1NEM0NC42ODYzIDU0IDQyIDUxLjMxMzcgNDIgNDhDNDIgNDQuNjg2MyA0NC42ODYzIDQyIDQ4IDQyWiIgZmlsbD0iI0ExQTFBMSIvPgo8L3N2Zz4K';
                              }}
                            />
                          ) : (
                            <div className="text-gray-500 text-xs text-center px-2">
                              <svg className="w-16 h-16 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Overview Section */}
                    <div className="mb-6">
                      <h3 className="text-xs font-semibold text-gray-700 mb-2">{t.overview}</h3>
                      <div className="w-full text-xs text-gray-700 min-h-[80px] whitespace-pre-wrap">
                        {overview || '\u00A0'}
                      </div>
                    </div>

                    {/* Contact Section */}
                    <div className="mb-6">
                      <h3 className="text-xs font-semibold text-gray-700 mb-2">{t.contact}</h3>
                      <div className="w-full text-xs text-gray-700 min-h-[80px] whitespace-pre-wrap">
                        {contact || '\u00A0'}
                      </div>
                    </div>

                    {/* Hobbies Section */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-700 mb-2">{t.hobbies}</h3>
                      <div className="w-full text-xs text-gray-700 min-h-[80px] whitespace-pre-wrap">
                        {hobbies || '\u00A0'}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - White Background */}
                  <div className="w-2/3 bg-white p-6">
                    {/* Name and Position */}
                    <div className="mb-6">
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {fullName || t.fullName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {position || t.position}
                      </div>
                    </div>

                    {/* Education Section */}
                    <div className="mb-6">
                      <h2 className="text-sm font-semibold text-gray-900 mb-3 border-b-2 border-gray-300 pb-1">
                        {t.education}
                      </h2>
                      <div className="border-b border-gray-200 mb-3"></div>
                      <div className="w-full text-xs text-gray-700 min-h-[200px] whitespace-pre-wrap">
                        {education || '\u00A0'}
                      </div>
                    </div>

                    {/* Experience Section */}
                    <div className="mb-6">
                      <h2 className="text-sm font-semibold text-gray-900 mb-3 border-b-2 border-gray-300 pb-1">
                        {t.experience}
                      </h2>
                      <div className="border-b border-gray-200 mb-3"></div>
                      <div className="w-full text-xs text-gray-700 min-h-[250px] whitespace-pre-wrap">
                        {experience || '\u00A0'}
                      </div>
                    </div>

                    {/* Skills Section */}
                    <div>
                      <h2 className="text-sm font-semibold text-gray-900 mb-3 border-b-2 border-gray-300 pb-1">
                        {t.skills}
                      </h2>
                      <div className="border-b border-gray-200 mb-3"></div>
                      <div className="w-full text-xs text-gray-700 min-h-[100px] whitespace-pre-wrap">
                        {skills || '\u00A0'}
                      </div>
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
        <div className="max-w-[800px] mx-auto bg-white shadow-lg" ref={pdfRef}>
          <div className="flex">
            {/* Left Column - Grey Background */}
            <div className="w-1/3 bg-gray-200 p-6">
              {/* Photo Section */}
              <div className="mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full border-4 border-blue-300 overflow-hidden bg-gray-300 flex items-center justify-center">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiByeD0iNDgiIGZpbGw9IiNEMEQwRDAiLz4KPHBhdGggZD0iTTQ4IDMyQzQ4IDI4LjY4NjMgNTAuNjg2MyAyNiA1NCAyNkM1Ny4zMTM3IDI2IDYwIDI4LjY4NjMgNjAgMzJDNjAgMzUuMzEzNyA1Ny4zMTM3IDM4IDU0IDM4QzUwLjY4NjMgMzggNDggMzUuMzEzNyA0OCAzMlpNNDggNDJDNTEuMzEzNyA0MiA1NCA0NC42ODYzIDU0IDQ4QzU0IDUxLjMxMzcgNTEuMzEzNyA1NCA0OCA1NEM0NC42ODYzIDU0IDQyIDUxLjMxMzcgNDIgNDhDNDIgNDQuNjg2MyA0NC42ODYzIDQyIDQ4IDQyWiIgZmlsbD0iI0ExQTFBMSIvPgo8L3N2Zz4K';
                        }}
                      />
                    ) : (
                      <div className="text-gray-500 text-xs text-center px-2">
                        <svg className="w-16 h-16 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Overview Section */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-700 mb-2">{t.overview}</h3>
                <div className="w-full text-xs text-gray-700 min-h-[80px] whitespace-pre-wrap">
                  {overview || '\u00A0'}
                </div>
              </div>

              {/* Contact Section */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-700 mb-2">{t.contact}</h3>
                <div className="w-full text-xs text-gray-700 min-h-[80px] whitespace-pre-wrap">
                  {contact || '\u00A0'}
                </div>
              </div>

              {/* Hobbies Section */}
              <div>
                <h3 className="text-xs font-semibold text-gray-700 mb-2">{t.hobbies}</h3>
                <div className="w-full text-xs text-gray-700 min-h-[80px] whitespace-pre-wrap">
                  {hobbies || '\u00A0'}
                </div>
              </div>
            </div>

            {/* Right Column - White Background */}
            <div className="w-2/3 bg-white p-6">
              {/* Name and Position */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {fullName || t.fullName}
                </div>
                <div className="text-sm text-gray-600">
                  {position || t.position}
                </div>
              </div>

              {/* Education Section */}
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-900 mb-3 border-b-2 border-gray-300 pb-1">
                  {t.education}
                </h2>
                <div className="border-b border-gray-200 mb-3"></div>
                <div className="w-full text-xs text-gray-700 min-h-[200px] whitespace-pre-wrap">
                  {education || '\u00A0'}
                </div>
              </div>

              {/* Experience Section */}
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-900 mb-3 border-b-2 border-gray-300 pb-1">
                  {t.experience}
                </h2>
                <div className="border-b border-gray-200 mb-3"></div>
                <div className="w-full text-xs text-gray-700 min-h-[250px] whitespace-pre-wrap">
                  {experience || '\u00A0'}
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-3 border-b-2 border-gray-300 pb-1">
                  {t.skills}
                </h2>
                <div className="border-b border-gray-200 mb-3"></div>
                <div className="w-full text-xs text-gray-700 min-h-[100px] whitespace-pre-wrap">
                  {skills || '\u00A0'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

