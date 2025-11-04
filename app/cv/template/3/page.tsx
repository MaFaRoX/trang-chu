'use client';

import { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';

// Component for editable text areas
const EditableTextArea = ({ 
  value, 
  onChange, 
  placeholder, 
  className = "text-gray-300 text-sm",
  rows = 3 
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
}) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={`${className} bg-transparent border-none outline-none resize-none w-full`}
    rows={rows}
  />
);

export default function CVTemplate3() {
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  
  // Translations
  const translations = {
    vi: {
      fullName: 'HỌ VÀ TÊN',
      position: 'Vị trí',
      overview: 'TỔNG QUAN',
      skills: 'KỸ NĂNG',
      contact: 'LIÊN HỆ',
      careerGoals: 'MỤC TIÊU NGHỀ NGHIỆP',
      education: 'HỌC VẤN',
      workExperience: 'KINH NGHIỆM LÀM VIỆC',
      exportPDF: 'Xuất PDF',
      cvPreview: 'Xem trước CV',
      downloadPDF: 'Tải xuống PDF',
      close: 'Đóng',
      clickToUpload: 'Nhấp để tải lên',
      fullNamePlaceholder: 'Nhập họ và tên của bạn',
      positionPlaceholder: 'Nhập vị trí của bạn',
      overviewPlaceholder: 'Nhập tổng quan của bạn...',
      skillsPlaceholder: 'Nhập kỹ năng của bạn...',
      contactPlaceholder: 'Nhập thông tin liên hệ của bạn...',
      careerGoalsPlaceholder: 'Nhập mục tiêu nghề nghiệp của bạn...',
      educationPlaceholder: 'Nhập thông tin học vấn của bạn...',
      workExperiencePlaceholder: 'Nhập kinh nghiệm làm việc của bạn...',
    },
    en: {
      fullName: 'FULL NAME',
      position: 'Position',
      overview: 'OVERVIEW',
      skills: 'SKILLS',
      contact: 'CONTACT',
      careerGoals: 'CAREER GOALS',
      education: 'EDUCATION',
      workExperience: 'WORK EXPERIENCE',
      exportPDF: 'Export PDF',
      cvPreview: 'CV Preview',
      downloadPDF: 'Download PDF',
      close: 'Close',
      clickToUpload: 'Click to upload',
      fullNamePlaceholder: 'Enter your full name',
      positionPlaceholder: 'Enter your position',
      overviewPlaceholder: 'Enter your overview...',
      skillsPlaceholder: 'Enter your skills...',
      contactPlaceholder: 'Enter your contact information...',
      careerGoalsPlaceholder: 'Enter your career goals...',
      educationPlaceholder: 'Enter your education details...',
      workExperiencePlaceholder: 'Enter your work experience...',
    },
  };

  const t = translations[language];

  // State for editable content
  const [content, setContent] = useState({
    fullName: t.fullName,
    position: t.position,
    overview: '',
    skills: '',
    contact: '',
    careerGoals: '',
    education: '',
    workExperience: ''
  });
  
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [cvData, setCvData] = useState<{
    fullName: string;
    position: string;
    overview: string;
    skills: string;
    contact: string;
    careerGoals: string;
    education: string;
    workExperience: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

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
    return {
      fullName: content.fullName || 'FULL NAME',
      position: content.position || 'Position',
      overview: content.overview ?? '',
      skills: content.skills ?? '',
      contact: content.contact ?? '',
      careerGoals: content.careerGoals ?? '',
      education: content.education ?? '',
      workExperience: content.workExperience ?? '',
    };
  };

  const handleExportPDF = () => {
    const data = getCVData();
    setCvData(data);
    setShowPreview(true);
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

  // Update default values when language changes
  useEffect(() => {
    setContent(prev => ({
      ...prev,
      fullName: prev.fullName === translations['vi'].fullName || prev.fullName === translations['en'].fullName ? t.fullName : prev.fullName,
      position: prev.position === translations['vi'].position || prev.position === translations['en'].position ? t.position : prev.position,
    }));
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
    <>
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50 language-dropdown-container">
        <div className="relative">
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
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
                  language === 'vi' ? 'bg-pink-500 text-white hover:bg-pink-600' : 'text-gray-800'
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
                  language === 'en' ? 'bg-pink-500 text-white hover:bg-pink-600' : 'text-gray-800'
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
      <main className="min-h-screen bg-gray-700 flex flex-col items-center justify-center p-4 relative">
        <div className="flex max-w-[800px] w-full bg-gray-700 shadow-2xl min-h-[120vh]" ref={cvRef}>
          {/* Cột trái */}
          <aside className="w-1/3 bg-gray-900 flex flex-col items-center p-4">
            <div 
              className="relative cursor-pointer group mb-3"
              onClick={handleImageClick}
            >
              <img
                src={profileImage || '/profile.jpg'}
                alt="Profile"
                className="w-24 h-24 object-cover rounded-sm transition-opacity group-hover:opacity-80"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiByeD0iMiIgZmlsbD0iIzM3MzczNyIvPgo8cGF0aCBkPSJNNjQgNDBDNjQgMzYuODY2IDY2Ljg2NiAzNCA3MCAzNEM3My4xMzM3IDM0IDc2IDM2Ljg2NiA3NiA0MEM3NiA0My4xMzM3IDczLjEzMzcgNDYgNzAgNDZDNjYuODY2IDQ2IDY0IDQzLjEzMzcgNjQgNDBaTTY0IDU0QzY3LjEzMzcgNTQgNzAgNTYuODY2IDcwIDYwQzcwIDYzLjEzMzcgNjcuMTMzNyA2NiA2NCA2NkM2MC44NjYgNjYgNTggNjMuMTMzNyA1OCA2MEM1OCA1Ni44NjYgNjAuODY2IDU0IDY0IDU0WiIgZmlsbD0iI0ExQTFBMSIvPgo8L3N2Zz4K';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center rounded-sm">
                <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100">{t.clickToUpload}</span>
              </div>
            </div>
            <EditableTextArea
              value={content.fullName}
              onChange={(value) => setContent(prev => ({ ...prev, fullName: value }))}
              placeholder={t.fullNamePlaceholder}
              className="text-white font-bold text-base text-center"
              rows={1}
            />
            <EditableTextArea
              value={content.position}
              onChange={(value) => setContent(prev => ({ ...prev, position: value }))}
              placeholder={t.positionPlaceholder}
              className="text-gray-400 text-xs mb-4 text-center"
              rows={1}
            />

            <div className="w-full border-t border-gray-500 mb-3"></div>
            <div className="w-full">
              <p className="text-pink-500 font-semibold mb-1 text-sm">{t.overview}</p>
              <EditableTextArea
                value={content.overview}
                onChange={(value) => setContent(prev => ({ ...prev, overview: value }))}
                placeholder={t.overviewPlaceholder}
                className="text-gray-300 text-xs"
                rows={4}
              />
            </div>

            <div className="w-full border-t border-gray-500 mb-3"></div>
            <div className="w-full">
              <p className="text-pink-500 font-semibold mb-1 text-sm">{t.skills}</p>
              <EditableTextArea
                value={content.skills}
                onChange={(value) => setContent(prev => ({ ...prev, skills: value }))}
                placeholder={t.skillsPlaceholder}
                className="text-gray-300 text-xs"
                rows={4}
              />
            </div>

            <div className="w-full border-t border-gray-500 mb-3"></div>
            <div className="w-full">
              <p className="text-pink-500 font-semibold mb-1 text-sm">{t.contact}</p>
              <EditableTextArea
                value={content.contact}
                onChange={(value) => setContent(prev => ({ ...prev, contact: value }))}
                placeholder={t.contactPlaceholder}
                className="text-gray-300 text-xs"
                rows={4}
              />
            </div>
          </aside>

          {/* Cột phải */}
          <section className="w-2/3 flex flex-col gap-3 p-4 bg-gray-800">
            <div className="bg-gray-900 p-3">
              <h2 className="text-pink-500 font-bold mb-1 text-sm">{t.careerGoals}</h2>
              <EditableTextArea
                value={content.careerGoals}
                onChange={(value) => setContent(prev => ({ ...prev, careerGoals: value }))}
                placeholder={t.careerGoalsPlaceholder}
                className="text-gray-300 text-xs"
                rows={6}
              />
            </div>

            <div className="bg-gray-900 p-3">
              <h2 className="text-pink-500 font-bold mb-1 text-sm">{t.education}</h2>
              <EditableTextArea
                value={content.education}
                onChange={(value) => setContent(prev => ({ ...prev, education: value }))}
                placeholder={t.educationPlaceholder}
                className="text-gray-300 text-xs"
                rows={9}
              />
            </div>

            <div className="bg-gray-900 p-3">
              <h2 className="text-pink-500 font-bold mb-1 text-sm">{t.workExperience}</h2>
              <EditableTextArea
                value={content.workExperience}
                onChange={(value) => setContent(prev => ({ ...prev, workExperience: value }))}
                placeholder={t.workExperiencePlaceholder}
                className="text-gray-300 text-xs"
                rows={9}
              />
            </div>
          </section>
        </div>

        {/* Export PDF Button */}
        <div className="w-full max-w-[800px] mt-6 mb-10 flex justify-center">
          <button
            onClick={handleExportPDF}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-200"
          >
            {t.exportPDF}
          </button>
        </div>
      </main>

      {/* Preview Modal */}
      {showPreview && cvData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-gray-800">{t.cvPreview}</h2>
              <div className="flex gap-3">
                <button
                  onClick={handleDownloadPDF}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
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
            <div className="p-6 bg-gray-700">
              <div className="flex max-w-[800px] w-full bg-gray-700 shadow-2xl min-h-[120vh]">
                {/* Cột trái */}
                <aside className="w-1/3 bg-gray-900 flex flex-col items-center p-4">
                  <img
                    src={profileImage || '/profile.jpg'}
                    alt="Profile"
                    className="w-24 h-24 object-cover rounded-sm mb-3"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiByeD0iMiIgZmlsbD0iIzM3MzczNyIvPgo8cGF0aCBkPSJNNjQgNDBDNjQgMzYuODY2IDY2Ljg2NiAzNCA3MCAzNEM3My4xMzM3IDM0IDc2IDM2Ljg2NiA3NiA0MEM3NiA0My4xMzM3IDczLjEzMzcgNDYgNzAgNDZDNjYuODY2IDQ2IDY0IDQzLjEzMzcgNjQgNDBaTTY0IDU0QzY3LjEzMzcgNTQgNzAgNTYuODY2IDcwIDYwQzcwIDYzLjEzMzcgNjcuMTMzNyA2NiA2NCA2NkM2MC44NjYgNjYgNTggNjMuMTMzNyA1OCA2MEM1OCA1Ni44NjYgNjAuODY2IDU0IDY0IDU0WiIgZmlsbD0iI0ExQTFBMSIvPgo8L3N2Zz4K';
                    }}
                  />
                  <div className="text-white font-bold text-base text-center mb-1 whitespace-pre-wrap">
                    {cvData.fullName}
                  </div>
                  <div className="text-gray-400 text-xs mb-4 text-center whitespace-pre-wrap">
                    {cvData.position}
                  </div>

                  <div className="w-full border-t border-gray-500 mb-3"></div>
                  <div className="w-full">
                    <p className="text-pink-500 font-semibold mb-1 text-sm">{t.overview}</p>
                    <div className="text-gray-300 text-xs whitespace-pre-wrap min-h-[4rem]">
                      {cvData.overview || '\u00A0'}
                    </div>
                  </div>

                  <div className="w-full border-t border-gray-500 mb-3"></div>
                  <div className="w-full">
                    <p className="text-pink-500 font-semibold mb-1 text-sm">{t.skills}</p>
                    <div className="text-gray-300 text-xs whitespace-pre-wrap min-h-[4rem]">
                      {cvData.skills || '\u00A0'}
                    </div>
                  </div>

                  <div className="w-full border-t border-gray-500 mb-3"></div>
                  <div className="w-full">
                    <p className="text-pink-500 font-semibold mb-1 text-sm">{t.contact}</p>
                    <div className="text-gray-300 text-xs whitespace-pre-wrap min-h-[4rem]">
                      {cvData.contact || '\u00A0'}
                    </div>
                  </div>
                </aside>

                {/* Cột phải */}
                <section className="w-2/3 flex flex-col gap-3 p-4 bg-gray-800">
                  <div className="bg-gray-900 p-3">
                    <h2 className="text-pink-500 font-bold mb-1 text-sm">{t.careerGoals}</h2>
                    <div className="text-gray-300 text-xs whitespace-pre-wrap min-h-[6rem]">
                      {cvData.careerGoals || '\u00A0'}
                    </div>
                  </div>

                  <div className="bg-gray-900 p-3">
                    <h2 className="text-pink-500 font-bold mb-1 text-sm">{t.education}</h2>
                    <div className="text-gray-300 text-xs whitespace-pre-wrap min-h-[9rem]">
                      {cvData.education || '\u00A0'}
                    </div>
                  </div>

                  <div className="bg-gray-900 p-3">
                    <h2 className="text-pink-500 font-bold mb-1 text-sm">{t.workExperience}</h2>
                    <div className="text-gray-300 text-xs whitespace-pre-wrap min-h-[9rem]">
                      {cvData.workExperience || '\u00A0'}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden PDF-ready version */}
      {cvData && (
        <div className="hidden">
          <div className="flex max-w-[800px] w-full bg-gray-700 shadow-2xl min-h-[120vh]" ref={pdfRef}>
            {/* Cột trái */}
            <aside className="w-1/3 bg-gray-900 flex flex-col items-center p-4">
              <img
                src={profileImage || '/profile.jpg'}
                alt="Profile"
                className="w-24 h-24 object-cover rounded-sm mb-3"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiByeD0iMiIgZmlsbD0iIzM3MzczNyIvPgo8cGF0aCBkPSJNNjQgNDBDNjQgMzYuODY2IDY2Ljg2NiAzNCA3MCAzNEM3My4xMzM3IDM0IDc2IDM2Ljg2NiA3NiA0MEM3NiA0My4xMzM3IDczLjEzMzcgNDYgNzAgNDZDNjYuODY2IDQ2IDY0IDQzLjEzMzcgNjQgNDBaTTY0IDU0QzY3LjEzMzcgNTQgNzAgNTYuODY2IDcwIDYwQzcwIDYzLjEzMzcgNjcuMTMzNyA2NiA2NCA2NkM2MC44NjYgNjYgNTggNjMuMTMzNyA1OCA2MEM1OCA1Ni44NjYgNjAuODY2IDU0IDY0IDU0WiIgZmlsbD0iI0ExQTFBMSIvPgo8L3N2Zz4K';
                }}
              />
              <div className="text-white font-bold text-base text-center mb-1 whitespace-pre-wrap">
                {cvData.fullName}
              </div>
              <div className="text-gray-400 text-xs mb-4 text-center whitespace-pre-wrap">
                {cvData.position}
              </div>

              <div className="w-full border-t border-gray-500 mb-3"></div>
              <div className="w-full">
                <p className="text-pink-500 font-semibold mb-1 text-sm">{t.overview}</p>
                <div className="text-gray-300 text-xs whitespace-pre-wrap min-h-[4rem]">
                  {cvData.overview || '\u00A0'}
                </div>
              </div>

              <div className="w-full border-t border-gray-500 mb-3"></div>
              <div className="w-full">
                <p className="text-pink-500 font-semibold mb-1 text-sm">{t.skills}</p>
                <div className="text-gray-300 text-xs whitespace-pre-wrap min-h-[4rem]">
                  {cvData.skills || '\u00A0'}
                </div>
              </div>

              <div className="w-full border-t border-gray-500 mb-3"></div>
              <div className="w-full">
                <p className="text-pink-500 font-semibold mb-1 text-sm">{t.contact}</p>
                <div className="text-gray-300 text-xs whitespace-pre-wrap min-h-[4rem]">
                  {cvData.contact || '\u00A0'}
                </div>
              </div>
            </aside>

            {/* Cột phải */}
            <section className="w-2/3 flex flex-col gap-3 p-4 bg-gray-800">
              <div className="bg-gray-900 p-3">
                <h2 className="text-pink-500 font-bold mb-1 text-sm">{t.careerGoals}</h2>
                <div className="text-gray-300 text-xs whitespace-pre-wrap min-h-[6rem]">
                  {cvData.careerGoals || '\u00A0'}
                </div>
              </div>

              <div className="bg-gray-900 p-3">
                <h2 className="text-pink-500 font-bold mb-1 text-sm">{t.education}</h2>
                <div className="text-gray-300 text-xs whitespace-pre-wrap min-h-[9rem]">
                  {cvData.education || '\u00A0'}
                </div>
              </div>

              <div className="bg-gray-900 p-3">
                <h2 className="text-pink-500 font-bold mb-1 text-sm">{t.workExperience}</h2>
                <div className="text-gray-300 text-xs whitespace-pre-wrap min-h-[9rem]">
                  {cvData.workExperience || '\u00A0'}
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

