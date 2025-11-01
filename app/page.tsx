"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isValuesModalOpen, setIsValuesModalOpen] = useState(false);
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  
  // Translations
  const translations = {
    vi: {
      welcome: "CHÀO MỪNG BẠN ĐẾN VỚI HOME.AI",
      mission: "SỨ MỆNH",
      values: "GIÁ TRỊ CỐT LÕI",
      support: "HỖ TRỢ",
      login: "ĐĂNG NHẬP",
      language: "NGÔN NGỮ",
      vietnamese: "Tiếng Việt",
      english: "English",
      contact: "Liên hệ:",
      download: "Tải về",
      // Products
      genealogy: "GIA PHẢ",
      familyCalendar: "LỊCH GIA ĐÌNH",
      onlineSales: "BÁN HÀNG ONLINE",
      cvOnline: "CV ONLINE",
      fundOnline: "QUỸ ONLINE",
      cafeOnline: "CAFEONLINE",
      qltnOnline: "QLTN ONLINE",
      qlxeOnline: "QL XE ONLINE",
      // Categories
      genealogyCategory: "Gia phả",
      familyCalendarCategory: "Lịch gia đình",
      familyFund: "Quỹ gia đình",
      fundOnlineCategory: "Quỹ Online",
      onlineSalesCategory: "Bán hàng Online",
      // Modal titles
      coreValues: "GIÁ TRỊ CỐT LÕI (CORE VALUES)",
      missionTitle: "SỨ MỆNH: HOME.AI",
      missionSubtitle: "ĐƠN GIẢN HÓA CÔNG NGHỆ, TỐI ƯU CUỘC SỐNG GIA ĐÌNH VÀ KINH DOANH",
      // Core Values cards
      simplifyTitle: "1. ĐƠN GIẢN HÓA",
      simplifyCore: "Giá trị cốt lõi:",
      simplifyCoreValue: "Lấy sự dễ dùng làm tiêu chí hàng đầu.",
      simplifyDesc: "Chúng tôi loại bỏ mọi phức tạp để công nghệ trở nên trực quan với bất kỳ ai.",
      understandTitle: "2. THẤU HIỂU",
      understandCore: "Giá trị cốt lõi:",
      understandCoreValue: "Luôn lắng nghe và đặt mình vào vị trí người dùng gia đình/kinh doanh tại gia.",
      understandDesc: "Sản phẩm phải giải quyết đúng vấn đề và phù hợp với thói quen sử dụng hàng ngày.",
      performanceTitle: "3. HIỆU SUẤT THỰC TẾ",
      performanceCore: "Giá trị cốt lõi:",
      performanceCoreValue: "Tập trung vào các giải pháp mang lại kết quả rõ ràng (tăng hiệu quả, giảm chi phí).",
      performanceDesc: "Mọi tính năng đều hướng đến mục tiêu cuối cùng: Tối ưu hóa cuộc sống và lợi nhuận kinh doanh tại gia.",
      trustTitle: "4. TIN CẬY & BỀN VỮNG",
      trustCore: "Giá trị cốt lõi:",
      trustCoreValue: "Xây dựng sản phẩm chất lượng, ổn định và bảo mật cao.",
      trustDesc: "Cam kết về chất lượng và sự hỗ trợ lâu dài, tạo dựng niềm tin tuyệt đối từ người dùng.",
      // Mission sections
      easyAITitle: "AI DỄ DÙNG",
      easyAICommitment: "Cam kết:",
      easyAIText: "Chúng tôi tin rằng công nghệ AI chỉ thực sự mạnh mẽ khi nó dễ dàng cho mọi người, ngay cả những người không am hiểu kỹ thuật.",
      easyAIDesc: "Giao diện trực quan, thao tác một chạm, và sự hỗ trợ thân thiện là ưu tiên hàng đầu trong mọi sản phẩm HOME.AI.",
      efficiencyTitle: "HIỆU QUẢ TẠI GIA",
      efficiencyPurpose: "Mục đích:",
      efficiencyText: "Hướng các ứng dụng thông minh vào gia đình và mô hình kinh doanh tại gia, giúp tăng hiệu suất và giảm thiểu chi phí vận hành.",
      efficiencyDesc: "Giúp mỗi ngôi nhà không chỉ là nơi sinh sống mà còn là trung tâm hoạt động hiệu quả, tiết kiệm nguồn lực tối đa.",
    },
    en: {
      welcome: "WELCOME TO HOME.AI",
      mission: "MISSION",
      values: "CORE VALUES",
      support: "SUPPORT",
      login: "LOGIN",
      language: "LANGUAGE",
      vietnamese: "Tiếng Việt",
      english: "English",
      contact: "Contact:",
      download: "Download",
      // Products
      genealogy: "GENEALOGY",
      familyCalendar: "FAMILY CALENDAR",
      onlineSales: "ONLINE SALES",
      cvOnline: "CV ONLINE",
      fundOnline: "ONLINE FUND",
      cafeOnline: "CAFEONLINE",
      qltnOnline: "QLTN ONLINE",
      qlxeOnline: "VEHICLE MGMT",
      // Categories
      genealogyCategory: "Genealogy",
      familyCalendarCategory: "Family Calendar",
      familyFund: "Family Fund",
      fundOnlineCategory: "Fund Online",
      onlineSalesCategory: "Online Sales",
      // Modal titles
      coreValues: "CORE VALUES",
      missionTitle: "MISSION: HOME.AI",
      missionSubtitle: "SIMPLIFYING TECHNOLOGY, OPTIMIZING HOME LIFE AND BUSINESS",
      // Core Values cards
      simplifyTitle: "1. SIMPLIFICATION",
      simplifyCore: "Core Value:",
      simplifyCoreValue: "Prioritizing ease of use.",
      simplifyDesc: "We eliminate all complexity to make technology intuitive for anyone.",
      understandTitle: "2. UNDERSTANDING",
      understandCore: "Core Value:",
      understandCoreValue: "Always listening and empathizing with home users/family businesses.",
      understandDesc: "Products must solve the right problems and fit daily usage habits.",
      performanceTitle: "3. REAL PERFORMANCE",
      performanceCore: "Core Value:",
      performanceCoreValue: "Focus on solutions that deliver clear results (increase efficiency, reduce costs).",
      performanceDesc: "Every feature aims at the ultimate goal: Optimizing life and home business profits.",
      trustTitle: "4. TRUST & SUSTAINABILITY",
      trustCore: "Core Value:",
      trustCoreValue: "Building high-quality, stable, and secure products.",
      trustDesc: "Committed to quality and long-term support, building absolute trust from users.",
      // Mission sections
      easyAITitle: "USER-FRIENDLY AI",
      easyAICommitment: "Commitment:",
      easyAIText: "We believe AI technology is only truly powerful when it's easy for everyone, even non-technical users.",
      easyAIDesc: "Intuitive interfaces, one-touch operations, and friendly support are top priorities in every HOME.AI product.",
      efficiencyTitle: "HOME EFFICIENCY",
      efficiencyPurpose: "Purpose:",
      efficiencyText: "Directing smart applications to homes and home-based business models, increasing efficiency and minimizing operational costs.",
      efficiencyDesc: "Helping every home not just be a place to live but also an efficient activity center, maximizing resource savings.",
    }
  };
  
  const t = translations[language];

  // Close language dropdown and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (isLanguageDropdownOpen && !target.closest('.language-dropdown')) {
        setIsLanguageDropdownOpen(false);
      }
      
      if (isMobileMenuOpen && !target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageDropdownOpen, isMobileMenuOpen]);

  return (
    <div className="min-h-screen w-full bg-tech text-white">
      {/* Title at very top */}
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 md:px-10">
        <h1 className="text-center text-[22px] md:text-[28px] font-bold tracking-widest text-white antialiased">
          {t.welcome}
        </h1>
      </div>
      {/* Header */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 pt-4 md:pt-8 md:px-10 relative z-50">
        <nav className="relative flex items-center justify-center gap-2 md:gap-8 rounded-2xl bg-white/8 px-3 py-2 md:px-6 md:py-2.5 text-xs md:text-sm backdrop-blur ring-1 ring-white/10">
          <div className="flex items-center gap-2 md:gap-3 pr-2 md:pr-4 md:mr-2 border-r border-white/10">
            <div className="flex h-7 w-7 md:h-9 md:w-9 items-center justify-center rounded-full bg-cyan-500/20 ring-1 ring-cyan-400/40">
              <Image src="/globe.svg" alt="logo" width={16} height={16} className="md:w-5 md:h-5" />
            </div>
            <span className="text-sm md:text-xl font-semibold tracking-wide">HOME.AI</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setIsMissionModalOpen(true)}
              className="hover:text-cyan-300 cursor-pointer bg-transparent border-none text-inherit"
            >
              {t.mission}
            </button>
            <button 
              onClick={() => setIsValuesModalOpen(true)}
              className="hover:text-cyan-300 cursor-pointer bg-transparent border-none text-inherit"
            >
              {t.values}
            </button>
            <a className="hover:text-cyan-300" href="#contact">{t.support}</a>
            <a className="hover:text-cyan-300" href="#login">{t.login}</a>
            <div className="relative language-dropdown">
              <button 
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="hover:text-cyan-300 cursor-pointer bg-transparent border-none text-inherit"
              >
                {t.language}
              </button>
              {isLanguageDropdownOpen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-40 rounded-lg bg-white/10 backdrop-blur ring-1 ring-white/20 shadow-lg z-50">
                  <button 
                    onClick={() => {
                      setLanguage('vi');
                      setIsLanguageDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-white/20 rounded-t-lg transition-colors"
                  >
                    {t.vietnamese}
                  </button>
                  <button 
                    onClick={() => {
                      setLanguage('en');
                      setIsLanguageDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-white/20 rounded-b-lg transition-colors"
                  >
                    {t.english}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-cyan-300 p-1"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </>
              )}
            </svg>
          </button>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-black/95 backdrop-blur ring-2 ring-white/30 shadow-2xl z-[100] md:hidden">
              <div className="flex flex-col p-4 gap-3">
                <button 
                  onClick={() => {
                    setIsMissionModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-white hover:text-cyan-300 hover:bg-white/10 transition-colors py-2 px-2 rounded-lg"
                >
                  {t.mission}
                </button>
                <button 
                  onClick={() => {
                    setIsValuesModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-white hover:text-cyan-300 hover:bg-white/10 transition-colors py-2 px-2 rounded-lg"
                >
                  {t.values}
                </button>
                <a className="text-white hover:text-cyan-300 hover:bg-white/10 transition-colors py-2 px-2 rounded-lg" href="#contact" onClick={() => setIsMobileMenuOpen(false)}>{t.support}</a>
                <a className="text-white hover:text-cyan-300 hover:bg-white/10 transition-colors py-2 px-2 rounded-lg" href="#login" onClick={() => setIsMobileMenuOpen(false)}>{t.login}</a>
                <div className="relative language-dropdown pt-2 border-t border-white/30">
                  <button 
                    onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                    className="text-left text-white hover:text-cyan-300 hover:bg-white/10 transition-colors py-2 px-2 rounded-lg w-full"
                  >
                    {t.language}
                  </button>
                  {isLanguageDropdownOpen && (
                    <div className="mt-2 rounded-lg bg-gray-900/90 backdrop-blur ring-2 ring-white/30">
                      <button 
                        onClick={() => {
                          setLanguage('vi');
                          setIsLanguageDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-white hover:bg-white/20 hover:text-cyan-300 rounded-t-lg transition-colors"
                      >
                        {t.vietnamese}
                      </button>
                      <button 
                        onClick={() => {
                          setLanguage('en');
                          setIsLanguageDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-white hover:bg-white/20 hover:text-cyan-300 rounded-b-lg transition-colors"
                      >
                        {t.english}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-4 md:px-10 md:pt-6">
        {/* Pills Row */}
        <div className="mx-auto mt-4 md:mt-7 grid max-w-4xl grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
          {[
            { id: "genealogy", label: t.genealogy, className: "bg-[#2D6DF6] hover:bg-[#2a61d7]" },
            { id: "familyCalendar", label: t.familyCalendar, className: "bg-[#FF8A34] hover:bg-[#e7792c]" },
            { id: "onlineSales", label: t.onlineSales, className: "bg-[#1CC7A5] hover:bg-[#17b295]" },
            { id: "cvOnline", label: t.cvOnline, className: "bg-[#7A5AF8] hover:bg-[#684ae6]" },
            { id: "fundOnline", label: t.fundOnline, className: "bg-[#17A2FF] hover:bg-[#1592e6]" },
            { id: "cafeOnline", label: t.cafeOnline, className: "bg-[#6B7280] hover:bg-[#5a606c]" },
            { id: "qltnOnline", label: t.qltnOnline, className: "bg-[#12B5A6] hover:bg-[#0fa394]" },
            { id: "qlxeOnline", label: t.qlxeOnline, className: "bg-[#5B6CFF] hover:bg-[#4f5fe6]" },
          ].map((b) => (
            <button
              key={b.id}
              className={
                "w-full rounded-md px-2 py-2 md:px-4 md:py-2.5 text-[11px] sm:text-[12px] md:text-[13px] font-semibold text-white shadow-sm transition-colors text-center " + b.className
              }
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <section className="mx-auto mt-6 md:mt-12 grid max-w-4xl grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          <div className={`rounded-xl md:rounded-2xl border border-white/10 bg-[#16B3C5] p-2 md:p-4 backdrop-blur flex flex-col items-center text-center`}>
            <div className={`flex h-12 w-12 md:h-20 md:w-20 items-center justify-center rounded-lg md:rounded-xl bg-[#16B3C5] shadow-inner`}>
              {/* Family tree icon */}
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[60px] md:h-[60px]">
                <circle cx="12" cy="6" r="3"/>
                <circle cx="8" cy="14" r="2"/>
                <circle cx="16" cy="14" r="2"/>
                <line x1="12" y1="9" x2="12" y2="12"/>
                <line x1="10" y1="14" x2="12" y2="12"/>
                <line x1="14" y1="14" x2="12" y2="12"/>
              </svg>
            </div>
            <div className="mt-2 md:mt-3 text-xs md:text-[15px] font-semibold text-white/95">{t.genealogyCategory}</div>
            <button className="mt-2 md:mt-3 w-20 md:w-24 rounded-md bg-gray-700 px-2 md:px-3 py-1 md:py-1.5 text-[11px] md:text-[13px] font-medium text-white ring-1 ring-gray-500/30 hover:bg-gray-600">
              {t.download}
            </button>
          </div>
          
          <div className={`rounded-xl md:rounded-2xl border border-white/10 bg-[#0FA6A6] p-2 md:p-4 backdrop-blur flex flex-col items-center text-center`}>
            <div className={`flex h-12 w-12 md:h-20 md:w-20 items-center justify-center rounded-lg md:rounded-xl bg-[#0FA6A6] shadow-inner`}>
              {/* Calendar icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-10 md:h-10">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
                <circle cx="8" cy="14" r="0.5" fill="white"/>
                <circle cx="12" cy="14" r="0.5" fill="white"/>
                <circle cx="16" cy="14" r="0.5" fill="white"/>
                <circle cx="8" cy="17" r="0.5" fill="white"/>
                <circle cx="12" cy="17" r="0.5" fill="white"/>
                <circle cx="16" cy="17" r="0.5" fill="white"/>
              </svg>
            </div>
            <div className="mt-2 md:mt-3 text-xs md:text-[15px] font-semibold text-white/95">{t.familyCalendarCategory}</div>
            <button className="mt-2 md:mt-3 w-20 md:w-24 rounded-md bg-gray-700 px-2 md:px-3 py-1 md:py-1.5 text-[11px] md:text-[13px] font-medium text-white ring-1 ring-gray-500/30 hover:bg-gray-600">
              {t.download}
            </button>
          </div>
          
          <div className={`rounded-xl md:rounded-2xl border border-white/10 bg-[#18C08F] p-2 md:p-4 backdrop-blur flex flex-col items-center text-center`}>
            <div className={`flex h-12 w-12 md:h-20 md:w-20 items-center justify-center rounded-lg md:rounded-xl bg-[#18C08F] shadow-inner`}>
              {/* Dollar sign icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-9 md:h-9">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <div className="mt-2 md:mt-3 text-xs md:text-[15px] font-semibold text-white/95">{t.familyFund}</div>
            <button className="mt-2 md:mt-3 w-20 md:w-24 rounded-md bg-gray-700 px-2 md:px-3 py-1 md:py-1.5 text-[11px] md:text-[13px] font-medium text-white ring-1 ring-gray-500/30 hover:bg-gray-600">
              {t.download}
            </button>
          </div>
          
          <div className={`rounded-xl md:rounded-2xl border border-white/10 bg-[#0EA5E9] p-2 md:p-4 backdrop-blur flex flex-col items-center text-center`}>
            <div className={`flex h-12 w-12 md:h-20 md:w-20 items-center justify-center rounded-lg md:rounded-xl bg-[#0EA5E9] shadow-inner`}>
              {/* Dollar sign icon in circle */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="md:w-9 md:h-9">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                <line x1="12" y1="6" x2="12" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M15 9.5C15 8.7 14.3 8 13.5 8h-3C9.7 8 9 8.7 9 9.5c0 .8.7 1.5 1.5 1.5h3c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5H9" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <div className="mt-2 md:mt-3 text-xs md:text-[15px] font-semibold text-white/95">{t.fundOnlineCategory}</div>
            <button className="mt-2 md:mt-3 w-20 md:w-24 rounded-md bg-gray-700 px-2 md:px-3 py-1 md:py-1.5 text-[11px] md:text-[13px] font-medium text-white ring-1 ring-gray-500/30 hover:bg-gray-600">
              {t.download}
            </button>
          </div>
          
          <div className={`rounded-xl md:rounded-2xl border border-white/10 bg-[#5865F2] p-2 md:p-4 backdrop-blur flex flex-col items-center text-center`}>
            <div className={`flex h-12 w-12 md:h-20 md:w-20 items-center justify-center rounded-lg md:rounded-xl bg-[#5865F2] shadow-inner`}>
              {/* Shopping cart icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-10 md:h-10">
                <circle cx="9" cy="20" r="1"/>
                <circle cx="20" cy="20" r="1"/>
                <path d="M1 1h4l2.7 13.3a2 2 0 0 0 2 1.7h9.6a2 2 0 0 0 2-1.7L23 6H6"/>
              </svg>
              </div>
            <div className="mt-2 md:mt-3 text-xs md:text-[15px] font-semibold text-white/95">{t.onlineSalesCategory}</div>
              <button className="mt-2 md:mt-3 w-20 md:w-24 rounded-md bg-gray-700 px-2 md:px-3 py-1 md:py-1.5 text-[11px] md:text-[13px] font-medium text-white ring-1 ring-gray-500/30 hover:bg-gray-600">
                {t.download}
              </button>
            </div>
        </section>
      </main>

      {/* Contact Section - Bottom Right */}
      <div className="fixed bottom-2 right-2 md:bottom-4 md:right-4 z-40 rounded-xl md:rounded-2xl bg-white/8 px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm backdrop-blur ring-1 ring-white/10 max-w-[calc(100vw-1rem)]">
        <div className="font-semibold mb-1 md:mb-2 text-white text-xs md:text-sm">{t.contact}</div>
        <div className="flex flex-col gap-0.5 md:gap-1 text-white/90 text-[10px] md:text-sm">
          <div>-Zalo: </div>
          <div>-Facebook: </div>
          <div>-Email: </div>
        </div>
      </div>

      {/* Core Values Modal */}
      {isValuesModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsValuesModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-6xl mx-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-cyan-50 to-teal-50 p-4 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsValuesModalOpen(false)}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer z-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:w-6 md:h-6">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Title */}
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-8">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="md:w-4 md:h-4">
                <path d="M12 2L15 9L22 10L17 15L18 22L12 18L6 22L7 15L2 10L9 9L12 2Z" fill="#10b981" stroke="#10b981" strokeWidth="1"/>
              </svg>
              <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-800">
                {t.coreValues}
              </h2>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Card 1: Đơn giản hóa */}
              <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg flex flex-col">
                <div className="mb-3 md:mb-4 flex justify-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-16 md:h-16">
                    {/* Hand pointing */}
                    <path d="M18 11v-1a2 2 0 0 0-2-2h-1"/>
                    <path d="M14 10V9a2 2 0 0 0-2-2h-1"/>
                    <path d="M10 9.5V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1"/>
                    <path d="M18 11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z"/>
                    {/* Screen/box */}
                    <rect x="2" y="8" width="12" height="10" rx="2" stroke="#10b981"/>
                    <line x1="6" y1="12" x2="10" y2="12"/>
                    <line x1="6" y1="14" x2="10" y2="14"/>
                  </svg>
                </div>
                <h3 className="text-xs md:text-sm font-bold text-blue-900 mb-2 md:mb-3">{t.simplifyTitle}</h3>
                <p className="text-xs md:text-sm text-gray-700 mb-1 md:mb-2">
                  <strong>{t.simplifyCore}</strong> {t.simplifyCoreValue}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  {t.simplifyDesc}
                </p>
              </div>

              {/* Card 2: Thấu hiểu */}
              <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg flex flex-col">
                <div className="mb-3 md:mb-4 flex justify-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-16 md:h-16">
                    {/* Heart */}
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    {/* Magnifying glass */}
                    <circle cx="12" cy="12" r="4" fill="none"/>
                    <path d="m15 15 3 3" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-xs md:text-sm font-bold text-blue-900 mb-2 md:mb-3">{t.understandTitle}</h3>
                <p className="text-xs md:text-sm text-gray-700 mb-1 md:mb-2">
                  <strong>{t.understandCore}</strong> {t.understandCoreValue}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  {t.understandDesc}
                </p>
              </div>

              {/* Card 3: Hiệu suất thực tế */}
              <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg flex flex-col">
                <div className="mb-3 md:mb-4 flex justify-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-16 md:h-16">
                    {/* Bar chart */}
                    <line x1="5" y1="18" x2="5" y2="12"/>
                    <line x1="10" y1="18" x2="10" y2="8"/>
                    <line x1="15" y1="18" x2="15" y2="10"/>
                    <line x1="20" y1="18" x2="20" y2="6"/>
                    {/* Base line */}
                    <line x1="3" y1="18" x2="22" y2="18"/>
                    {/* Upward arrow */}
                    <path d="M18 6l3-3 3 3" strokeLinecap="round"/>
                    <line x1="21" y1="3" x2="21" y2="9" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-xs md:text-sm font-bold text-blue-900 mb-2 md:mb-3">{t.performanceTitle}</h3>
                <p className="text-xs md:text-sm text-gray-700 mb-1 md:mb-2">
                  <strong>{t.performanceCore}</strong> {t.performanceCoreValue}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  {t.performanceDesc}
                </p>
              </div>

              {/* Card 4: Tin cậy & Bền vững */}
              <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg flex flex-col">
                <div className="mb-3 md:mb-4 flex justify-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-16 md:h-16">
                    {/* Tree trunk */}
                    <rect x="10" y="14" width="4" height="6" fill="none"/>
                    {/* Tree canopy */}
                    <circle cx="12" cy="10" r="5" fill="none"/>
                  </svg>
                </div>
                <h3 className="text-xs md:text-sm font-bold text-blue-900 mb-2 md:mb-3">{t.trustTitle}</h3>
                <p className="text-xs md:text-sm text-gray-700 mb-1 md:mb-2">
                  <strong>{t.trustCore}</strong> {t.trustCoreValue}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  {t.trustDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mission Modal */}
      {isMissionModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMissionModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl mx-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsMissionModalOpen(false)}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer z-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:w-6 md:h-6">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Header Section - Outside white box */}
            <div className="text-center mb-4 md:mb-6">
              {/* Rocket Icon */}
              <div className="flex justify-center mb-2 md:mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-8 md:h-8">
                  {/* Rocket body */}
                  <path d="M12 2L9 8h6L12 2z" fill="white" stroke="#3B82F6"/>
                  {/* Rocket tip */}
                  <circle cx="12" cy="10" r="2" fill="white" stroke="#3B82F6"/>
                  {/* Rocket base */}
                  <path d="M9 8v6l3 2 3-2V8" fill="white" stroke="#3B82F6"/>
                  {/* Flame */}
                  <path d="M10 14c-1 2-1 4 0 5c1 1 3 1 4 0c1-1 1-3 0-5" fill="#FF6B35" stroke="#FF6B35" strokeWidth="1"/>
                </svg>
              </div>
              <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
                {t.missionTitle}
              </h2>
              <p className="text-sm md:text-lg lg:text-xl font-bold text-gray-800">
                {t.missionSubtitle}
              </p>
            </div>

            {/* White Content Box */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* Left Section - AI DỄ DÙNG */}
                <div className="flex flex-col">
                  <div className="mb-3 md:mb-4 flex justify-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-16 md:h-16">
                      {/* Hand pointing - reused from GIÁ TRỊ CỐT LÕI modal */}
                      <path d="M18 11v-1a2 2 0 0 0-2-2h-1"/>
                      <path d="M14 10V9a2 2 0 0 0-2-2h-1"/>
                      <path d="M10 9.5V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1"/>
                      <path d="M18 11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z"/>
                      {/* Screen/box */}
                      <rect x="2" y="8" width="12" height="10" rx="2" stroke="#10b981"/>
                      <line x1="6" y1="12" x2="10" y2="12"/>
                      <line x1="6" y1="14" x2="10" y2="14"/>
                    </svg>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-blue-900 mb-2 md:mb-4 text-center">{t.easyAITitle}</h3>
                  <p className="text-xs md:text-sm text-gray-700 mb-2 md:mb-3">
                    <strong>{t.easyAICommitment}</strong> {t.easyAIText}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">
                    {t.easyAIDesc}
                  </p>
                </div>

                {/* Right Section - Hiệu quả tại gia */}
                <div className="flex flex-col">
                  <div className="mb-3 md:mb-4 flex justify-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-16 md:h-16">
                      {/* Bar chart - reused from GIÁ TRỊ CỐT LÕI modal */}
                      <line x1="5" y1="18" x2="5" y2="12"/>
                      <line x1="10" y1="18" x2="10" y2="8"/>
                      <line x1="15" y1="18" x2="15" y2="10"/>
                      <line x1="20" y1="18" x2="20" y2="6"/>
                      {/* Base line */}
                      <line x1="3" y1="18" x2="22" y2="18"/>
                      {/* Upward arrow */}
                      <path d="M18 6l3-3 3 3" strokeLinecap="round"/>
                      <line x1="21" y1="3" x2="21" y2="9" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-blue-900 mb-2 md:mb-4 text-center">{t.efficiencyTitle}</h3>
                  <p className="text-xs md:text-sm text-gray-700 mb-2 md:mb-3">
                    <strong>{t.efficiencyPurpose}</strong> {t.efficiencyText}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">
                    {t.efficiencyDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
