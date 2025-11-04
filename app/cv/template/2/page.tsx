'use client';

import { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';

export default function CVTemplate2() {
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [cvData, setCvData] = useState<{
    fullName: string;
    position: string;
    overview: string;
    skills: string;
    contact: string;
    education: string;
    experience: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  // Translations
  const translations = {
    vi: {
      fullName: 'Họ và tên',
      position: 'Vị trí',
      overview: 'TỔNG QUAN',
      skills: 'KỸ NĂNG',
      contact: 'LIÊN HỆ',
      education: 'HỌC VẤN',
      workExperience: 'KINH NGHIỆM LÀM VIỆC',
      exportPDF: 'Xuất PDF',
      cvPreview: 'Xem trước CV',
      downloadPDF: 'Tải xuống PDF',
      close: 'Đóng',
      clickToUpload: 'Nhấp để tải lên',
    },
    en: {
      fullName: 'Full name',
      position: 'Position',
      overview: 'OVERVIEW',
      skills: 'SKILLS',
      contact: 'CONTACT',
      education: 'EDUCATION',
      workExperience: 'WORK EXPERIENCE',
      exportPDF: 'Export PDF',
      cvPreview: 'CV Preview',
      downloadPDF: 'Download PDF',
      close: 'Close',
      clickToUpload: 'Click to upload',
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
        alert('Please select a valid image file.');
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const getCVData = () => {
    if (!cvRef.current) return null;
    const element = cvRef.current;
    
    // Find sections by their parent structure - use attribute selector for Tailwind classes
    const leftColumn = Array.from(element.querySelectorAll('div')).find(el => 
      el.classList.contains('w-1/4') && el.classList.contains('bg-gray-900')
    );
    const rightColumn = Array.from(element.querySelectorAll('div')).find(el => 
      el.classList.contains('w-3/4')
    );
    
    // Get editable content from left column (overview, skills, contact) - these are divs
    const leftContentEditable = leftColumn?.querySelectorAll('div[contenteditable]') || [];
    
    // Get h1 and p directly
    const fullNameEl = element.querySelector('h1[contenteditable]');
    const positionEl = element.querySelector('p[contenteditable]');
    
    // Get education and experience divs - they have bg-gray-800 class and are in the right column
    const rightContentEditableDivs = rightColumn?.querySelectorAll('div[contenteditable].bg-gray-800') || [];
    
    // Use innerText for better contentEditable support, fallback to textContent
    const getText = (el: Element | null) => {
      if (!el) return '';
      return (el as HTMLElement).innerText?.trim() || el.textContent?.trim() || '';
    };
    
    return {
      fullName: getText(fullNameEl) || 'Full name',
      position: getText(positionEl) || 'Position',
      overview: getText(leftContentEditable[0] || null),
      skills: getText(leftContentEditable[1] || null),
      contact: getText(leftContentEditable[2] || null),
      education: getText(rightContentEditableDivs[0] || null),
      experience: getText(rightContentEditableDivs[1] || null),
    };
  };

  const handleExportPDF = () => {
    const data = getCVData();
    if (data) {
      setCvData(data);
      setShowPreview(true);
    }
  };

  const handleDownloadPDF = () => {
    if (!pdfRef.current || !cvData) return;

    const fullName = cvData.fullName || 'cv';
    const element = pdfRef.current;
    const opt = {
      margin: 0,
      filename: `${fullName}.pdf`,
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 relative">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50 language-dropdown-container">
        <div className="relative">
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
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
                  language === 'vi' ? 'bg-gray-900 text-white hover:bg-gray-800' : 'text-gray-800'
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
                  language === 'en' ? 'bg-gray-900 text-white hover:bg-gray-800' : 'text-gray-800'
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
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-lg overflow-hidden" ref={cvRef}>
        <div className="flex bg-white font-sans">
          {/* Cột bên trái */}
          <div className="w-1/4 bg-gray-900 text-white flex flex-col items-center py-6">
            {/* Ảnh đại diện */}
            <div 
              className="w-32 h-32 rounded-md overflow-hidden mb-6 border-2 border-gray-700 relative cursor-pointer group"
              onClick={handleImageClick}
            >
              <img
                src={profileImage || '/avatar.jpg'}
                alt="Avatar"
                className="w-full h-full object-cover transition-opacity group-hover:opacity-80"
                onError={(e) => {
                  // Fallback to a placeholder if image doesn't exist
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiByeD0iOCIgZmlsbD0iIzM3MzczNyIvPgo8cGF0aCBkPSJNNjQgNDBDNjQgMzYuODY2IDY2Ljg2NiAzNCA3MCAzNEM3My4xMzM3IDM0IDc2IDM2Ljg2NiA3NiA0MEM3NiA0My4xMzM3IDczLjEzMzcgNDYgNzAgNDZDNjYuODY2IDQ2IDY0IDQzLjEzMzcgNjQgNDBaTTY0IDU0QzY3LjEzMzcgNTQgNzAgNTYuODY2IDcwIDYwQzcwIDYzLjEzMzcgNjcuMTMzNyA2NiA2NCA2NkM2MC44NjYgNjYgNTggNjMuMTMzNyA1OCA2MEM1OCA1Ni44NjYgNjAuODY2IDU0IDY0IDU0WiIgZmlsbD0iI0ExQTFBMSIvPgo8L3N2Zz4K';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100">{t.clickToUpload}</span>
              </div>
            </div>

            {/* Menu */}
            <div className="w-full text-center mt-4 space-y-6">
              <div>
                <SectionTitle title={t.overview} />
                <div
                  className="bg-gray-800 h-24 mt-2 mx-4 rounded text-left p-3 text-sm"
                  contentEditable
                  suppressContentEditableWarning
                ></div>
              </div>
              
              <div>
                <SectionTitle title={t.skills} />
                <div
                  className="bg-gray-800 h-32 mt-2 mx-4 rounded text-left p-3 text-sm"
                  contentEditable
                  suppressContentEditableWarning
                ></div>
              </div>
              
              <div>
                <SectionTitle title={t.contact} />
                <div
                  className="bg-gray-800 h-24 mt-2 mx-4 rounded text-left p-3 text-sm"
                  contentEditable
                  suppressContentEditableWarning
                ></div>
              </div>
            </div>
          </div>

          {/* Cột bên phải */}
          <div className="w-3/4 p-6">
            {/* Header */}
            <div className="flex items-center justify-center border-b pb-4">
              <div className="text-center">
                <h1
                  className="text-3xl font-bold text-gray-800 editable"
                  contentEditable
                  suppressContentEditableWarning
                >
                  {t.fullName}
                </h1>
                <p
                  className="text-gray-500 editable"
                  contentEditable
                  suppressContentEditableWarning
                >
                  {t.position}
                </p>
              </div>
            </div>

            {/* Education */}
            <div className="mt-6">
              <h2 className="bg-gray-900 text-white text-center py-2 font-semibold">
                {t.education}
              </h2>
              <div
                className="bg-gray-800 h-64 mt-2 text-white p-3"
                contentEditable
                suppressContentEditableWarning
              ></div>
            </div>

            {/* Work Experience */}
            <div className="mt-6">
              <h2 className="bg-gray-900 text-white text-center py-2 font-semibold">
                {t.workExperience}
              </h2>
              <div
                className="bg-gray-800 h-80 mt-2 text-white p-3"
                contentEditable
                suppressContentEditableWarning
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Export PDF Button */}
      <div className="w-full max-w-6xl mt-6 mb-10 flex justify-center">
        <button
          onClick={handleExportPDF}
          className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-200"
        >
          {t.exportPDF}
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && cvData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto shadow-2xl">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
                <h2 className="text-2xl font-bold text-gray-800">{t.cvPreview}</h2>
                <div className="flex gap-3">
                  <button
                    onClick={handleDownloadPDF}
                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
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
                <div className="w-full bg-white shadow-2xl rounded-lg overflow-hidden">
                  <div className="flex bg-white font-sans">
                    {/* Cột bên trái */}
                    <div className="w-1/4 bg-gray-900 text-white flex flex-col items-center py-6">
                      {/* Ảnh đại diện */}
                      <div className="w-32 h-32 rounded-md overflow-hidden mb-6 border-2 border-gray-700">
                        <img
                          src={profileImage || '/avatar.jpg'}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiByeD0iOCIgZmlsbD0iIzM3MzczNyIvPgo8cGF0aCBkPSJNNjQgNDBDNjQgMzYuODY2IDY2Ljg2NiAzNCA3MCAzNEM3My4xMzM3IDM0IDc2IDM2Ljg2NiA3NiA0MEM3NiA0My4xMzM3IDczLjEzMzcgNDYgNzAgNDZDNjYuODY2IDQ2IDY0IDQzLjEzMzcgNjQgNDBaTTY0IDU0QzY3LjEzMzcgNTQgNzAgNTYuODY2IDcwIDYwQzcwIDYzLjEzMzcgNjcuMTMzNyA2NiA2NCA2NkM2MC44NjYgNjYgNTggNjMuMTMzNyA1OCA2MEM1OCA1Ni44NjYgNjAuODY2IDU0IDY0IDU0WiIgZmlsbD0iI0ExQTFBMSIvPgo8L3N2Zz4K';
                          }}
                        />
                      </div>

                      {/* Menu */}
                      <div className="w-full text-center mt-4 space-y-6">
                        <div>
                          <SectionTitle title={t.overview} />
                          <div className="bg-gray-800 h-24 mt-2 mx-4 rounded text-left p-3 text-sm whitespace-pre-wrap">
                            {cvData.overview}
                          </div>
                        </div>
                        
                        <div>
                          <SectionTitle title={t.skills} />
                          <div className="bg-gray-800 h-32 mt-2 mx-4 rounded text-left p-3 text-sm whitespace-pre-wrap">
                            {cvData.skills}
                          </div>
                        </div>
                        
                        <div>
                          <SectionTitle title={t.contact} />
                          <div className="bg-gray-800 h-24 mt-2 mx-4 rounded text-left p-3 text-sm whitespace-pre-wrap">
                            {cvData.contact}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cột bên phải */}
                    <div className="w-3/4 p-6">
                      {/* Header */}
                      <div className="flex items-center justify-center border-b pb-4">
                        <div className="text-center">
                          <h1 className="text-3xl font-bold text-gray-800">
                            {cvData.fullName}
                          </h1>
                          <p className="text-gray-500">
                            {cvData.position}
                          </p>
                        </div>
                      </div>

                      {/* Education */}
                      <div className="mt-6">
                        <h2 className="bg-gray-900 text-white text-center py-2 font-semibold">
                          {t.education}
                        </h2>
                        <div className="bg-gray-800 h-64 mt-2 text-white p-3 whitespace-pre-wrap">
                          {cvData.education}
                        </div>
                      </div>

                      {/* Work Experience */}
                      <div className="mt-6">
                        <h2 className="bg-gray-900 text-white text-center py-2 font-semibold">
                          {t.workExperience}
                        </h2>
                        <div className="bg-gray-800 h-80 mt-2 text-white p-3 whitespace-pre-wrap">
                          {cvData.experience}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )}

      {/* Hidden PDF-ready version */}
      {cvData && (
        <div className="hidden">
          <div className="w-full bg-white shadow-2xl rounded-lg overflow-hidden" ref={pdfRef}>
            <div className="flex bg-white font-sans">
                {/* Cột bên trái */}
                <div className="w-1/4 bg-gray-900 text-white flex flex-col items-center py-6">
                  {/* Ảnh đại diện */}
                  <div className="w-32 h-32 rounded-md overflow-hidden mb-6 border-2 border-gray-700">
                    <img
                      src={profileImage || '/avatar.jpg'}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiByeD0iOCIgZmlsbD0iIzM3MzczNyIvPgo8cGF0aCBkPSJNNjQgNDBDNjQgMzYuODY2IDY2Ljg2NiAzNCA3MCAzNEM3My4xMzM3IDM0IDc2IDM2Ljg2NiA3NiA0MEM3NiA0My4xMzM3IDczLjEzMzcgNDYgNzAgNDZDNjYuODY2IDQ2IDY0IDQzLjEzMzcgNjQgNDBaTTY0IDU0QzY3LjEzMzcgNTQgNzAgNTYuODY2IDcwIDYwQzcwIDYzLjEzMzcgNjcuMTMzNyA2NiA2NCA2NkM2MC44NjYgNjYgNTggNjMuMTMzNyA1OCA2MEM1OCA1Ni44NjYgNjAuODY2IDU0IDY0IDU0WiIgZmlsbD0iI0ExQTFBMSIvPgo8L3N2Zz4K';
                      }}
                    />
                  </div>

                  {/* Menu */}
                  <div className="w-full text-center mt-4 space-y-6">
                    <div>
                      <SectionTitle title={t.overview} />
                      <div className="bg-gray-800 h-24 mt-2 mx-4 rounded text-left p-3 text-sm whitespace-pre-wrap">
                        {cvData.overview}
                      </div>
                    </div>
                    
                    <div>
                      <SectionTitle title={t.skills} />
                      <div className="bg-gray-800 h-32 mt-2 mx-4 rounded text-left p-3 text-sm whitespace-pre-wrap">
                        {cvData.skills}
                      </div>
                    </div>
                    
                    <div>
                      <SectionTitle title={t.contact} />
                      <div className="bg-gray-800 h-24 mt-2 mx-4 rounded text-left p-3 text-sm whitespace-pre-wrap">
                        {cvData.contact}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cột bên phải */}
                <div className="w-3/4 p-6">
                  {/* Header */}
                  <div className="flex items-center justify-center border-b pb-4">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold text-gray-800">
                        {cvData.fullName}
                      </h1>
                      <p className="text-gray-500">
                        {cvData.position}
                      </p>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mt-6">
                    <h2 className="bg-gray-900 text-white text-center py-2 font-semibold">
                      {t.education}
                    </h2>
                    <div className="bg-gray-800 h-64 mt-2 text-white p-3 whitespace-pre-wrap">
                      {cvData.education}
                    </div>
                  </div>

                  {/* Work Experience */}
                  <div className="mt-6">
                    <h2 className="bg-gray-900 text-white text-center py-2 font-semibold">
                      {t.workExperience}
                    </h2>
                    <div className="bg-gray-800 h-80 mt-2 text-white p-3 whitespace-pre-wrap">
                      {cvData.experience}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="w-full flex flex-col items-center">
      <hr className="w-2/3 border-gray-700 mb-2" />
      <p className="text-cyan-400 font-semibold">{title}</p>
      <hr className="w-2/3 border-gray-700 mt-2" />
    </div>
  );
}

