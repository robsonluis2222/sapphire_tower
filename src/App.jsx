import { useRef, useState, useEffect } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ImagemCorretora from '../public/corretora.webp'
import {api} from './api';
import { Carousel } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import ScrollReveal from 'scrollreveal';
import InputMask from 'react-input-mask';
import './App.css'

function App() {
  const [status, setStatus] = useState(null);

  const videoRef = useRef(null)
  const allStagesRef = useRef(null)
  const stageControls = useRef(null)
  const sucessRef = useRef(null)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [prefer, setPrefer] = useState('');

  const [selectedType, setSelectedType] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [progress, setProgress] = useState(0)
  const [isCheckedWpp, setIsCheckedWpp] = useState(false)
  const [isCheckedTel, setIsCheckedTel] = useState(false)
  const [isCheckedMail, setIsCheckedMail] = useState(false)
  const [geralServicesStage, setGeralServicesStage] = useState(0)
  const [structureStage, setStructureStage] = useState(0)
  const [sealingStage, setSealingStage] = useState(0)
  const [installationStage, setInstallationStage] = useState(0)
  const [elevatorStage, setElevatorStage] = useState(0)
  const [argamassaStage, setArgamassaStage] = useState(0)
  const [acabamentosStage, setAcabamentosStage] = useState(0)
  const [esquadriasStage, setEsquadriasStage] = useState(0)
  const [moveisStage, setMoveisStage] = useState(0)

  useEffect(() => {
    const getStage = async () => {
      const response = await api.get('/sapphire-tower')
      console.log(response.data)
      setGeralServicesStage(response.data.stages[0].percentage)
      setStructureStage(response.data.stages[1].percentage)
      setSealingStage(response.data.stages[2].percentage)
      setInstallationStage(response.data.stages[3].percentage)
      setArgamassaStage(response.data.stages[4].percentage)
      setElevatorStage(response.data.stages[5].percentage)
      setAcabamentosStage(response.data.stages[6].percentage)
      setEsquadriasStage(response.data.stages[7].percentage)
      setMoveisStage(response.data.stages[8].percentage)
      setProgress(response.data.stage)
    }
    getStage()
  }, [])


  useEffect(() => {
    const sr = ScrollReveal({
      distance: '50px',
      duration: 1000,
      easing: 'ease-in-out',
      origin: 'bottom',
      interval: 200
    });

    sr.reveal('.header', { origin: 'top' });
    sr.reveal('.video-frame', { origin: 'bottom' });
    sr.reveal('.about', { origin: 'bottom' });
    sr.reveal('.carrossel', { origin: 'bottom' });
    videoRef.current.style.display = 'none'
  }, []);

  const handleSubmit = () => {
    if(name === '' || email === '' || telefone === ''){
      alert('Preencha todos os campos para que possamos entrar em contato.')
      return;
    }
    else{
      const templateParams = {
        from_name: name,
        email: email,
        telefone: telefone,
        value: selectedValue,
        type: selectedType,
        preferencia: prefer
      }
      emailjs.send('sapphire_tower', 'template_inr134g', templateParams, 'JPAVWt7ZEJ6dVPsm4')
      setName('')
      setEmail('')
      setTelefone('')
      sucessRef.current.style.display = 'flex'
    }
  }

  const handleChangeName = (e) => {
    setName(e.target.value)
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleChangeTelefone = (e) => {
    setTelefone(e.target.value)
  }

  const handleCheck = (item) => {
    if(item === 'wpp'){
      setIsCheckedWpp(true)
      setPrefer('WhatsApp')
      setIsCheckedMail(false)
      setIsCheckedTel(false)
    }
    if(item === 'tel'){
      setIsCheckedWpp(false)
      setIsCheckedMail(false)
      setIsCheckedTel(true)
      setPrefer('Telefone')
    }
    if(item === 'mail'){
      setIsCheckedWpp(false)
      setIsCheckedMail(true)
      setPrefer('E-Mail')
      setIsCheckedTel(false)
    }
  }
  const handleType = (event) => {
    setSelectedType(event.target.value);
  };
  const handleValue = (event) => {
    setSelectedValue(event.target.value);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showStages = () => {
    allStagesRef.current.style.display = 'flex';
    stageControls.current.style.display = 'none';
  }

  const openVideoModal = () => {
    videoRef.current.style.display = 'flex'
  }

  const closeVideoModal = () => {
    videoRef.current.style.display = 'none'
  }

  return (
    <div className='App'>

      <div className='video-modal' ref={videoRef}>
        <i className="bi bi-x-lg" id='close-video-btn' onClick={closeVideoModal}></i>
        <div className='frame-video'>
          <iframe id='iframe' src="https://www.youtube.com/embed/gnM9KaaFjhA" title="YOUTUBE VIDEO PLAYER" frameborder="0" allow=" accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>


      <div className='header'>
        <div className='more-infor'>
          <span className='title-of'>
            SAPPHIRE TOWER
          </span>
          <span className='subtitle-nav'>
            O Refúgio de Luxo na Barra Norte
          </span>
          <span className='apresentacao'>
            AV. BRASIL - BARRA NORTE
          </span>
          <span className='lancamento'>LANÇAMENTO</span>
          <span className='saber-mais-span' onClick={() => scrollToSection('section1')}>
            SAIBA MAIS
          </span>
          <i className="bi bi-chevron-double-down" id='arrow-down' onClick={() => scrollToSection('section1')}></i>
        </div>
      </div>


      <div className='video-frame' id='section1'>
          <div className='title-video-frame'>
            <span className='title-video'>Sapphire Tower</span>
            <span className='subtitle-video'>DESCUBRA UM NOVO PADRÃO DE VIDA EM BALNEÁRIO CAMBORIÚ !</span>
          </div>
          <div className='video'>
            <span className='video-btn' onClick={openVideoModal}>VÍDEO</span>
          </div>
      </div>

      <div className='about'>
        <div className='about-title-frame'>
          <img className='imagem-corretora' src={ImagemCorretora} alt="" />
          <span className='about-title'>NO <span id='especific-color'>SAPPHIRE TOWER</span>, CADA DETALHE REFLETE UM PADRÃO INIGUALÁVEL DE LUXO. CONFIE EM <span id='especific-color'>ELIZÂNGELA RUFATTO</span> PARA TORNAR ESTE SONHO UMA REALIDADE.</span>
        </div>
      </div>

      <div className='carrossel'>
        <Carousel indicators={false}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/84c14a34-e755-41ad-ab19-9e6bcb224725/sapphire-tower-spa-1920x1200.jpg?fm=jpg&q=80&fit=max"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>SPA</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/fa4f2dd4-f06e-4ddf-a1ef-97ec364358d8/sapphire-tower-suite-1920x1200.jpg?fm=jpg&q=80&fit=max"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Suite</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/8df11a5f-3c11-4e02-9f2c-f101fa59f711/sapphire-tower-salao-de-jogos-1920x1200.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Sala de Jogos</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/0ace4e75-1858-4a45-b268-f6e5c976bcfe/sapphire-tower-rooftop-lounge-externo-1920x1200.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Rooftop Lounge Externo</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/d7e3bbf5-be58-49a0-9401-a6b3f98a18c5/sapphire-tower-rooftop-lounge-1920x1200.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Rooftop Lounge</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/265aeab6-6c98-4510-9b2b-d4a6d2de835f/sapphire-tower-piscina-1920x1200.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Piscina</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/fe694b38-77c9-4b09-81cb-ffb3e23bb4f7/sapphire-tower-quiosque1920x1200.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Quiosque</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/f6cacac6-8d97-4a07-8aaa-d12f8e76ca6d/sapphire-tower-rooftop-cozinha-1920x1200.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Rooftop Cozinha</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/9fcd9a28-42ee-4d45-a309-79f19fe37e4d/sapphire-tower-living-1920x1200.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Living</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/32d03b75-127a-4edb-b66d-226472f3aad7/sapphire-tower-gourmet-1920x1200.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Gourmet</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/bbb08ea7-b4e2-4594-bc50-a02aecb7c147/sapphire-tower-embrasamento-1920x1200.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Embasamento</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/227c1c9f-746c-4710-a5df-3967e6f81f26/sapphire-tower-embasamento2-1920x1200.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Embasamento</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/6df3d061-ead6-494f-b666-a52d5d4a910f/sapphire-tower-duplex-piscina1920x1200.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Duplex Piscina</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/26976921-e3f2-49eb-a974-01b33a46c1c8/sapphire-tower-brinquedoteca-1920x1200.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Brinquedoteca</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/d469c570-6a90-4ca3-8220-015489befd74/sapphire-tower-beauty-1920x1200.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Espaço Beauty</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/995fe184-d570-4ede-8c9e-1ed8ecdcbf40/sapphire-tower-lounge-externo.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Lounge Externo</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/82d08fd4-abf2-4990-aa97-16553ff2604b/sapphire-tower-pilates.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Pilates</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/271b9c51-8039-47c6-b0ce-28ca1e99922d/sapphire-tower-piscina.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Piscina</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/15470c18-6904-47bc-8cac-7931162d1ce0/sapphire-tower-poker.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Poker</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/21558831-763a-44bd-a624-66b0dd4c15eb/sapphire-tower-salamassagem.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Sala de Massagem</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/4a6d4539-acc3-464c-99ca-3d467825e60a/sapphire-tower-academia-atualizada.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Academia</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/1ec9f3b9-55ac-40c2-afbd-1221c6ccfe84/sapphire-tower-duplex-atualizada.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Duplex</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/0f060b44-1845-4a31-b5d8-11d89fa2e1b1/sapphire-tower-gazebo-atualizada.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Gazebo</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/2e96c3aa-fd72-4893-9703-29acb90cf5ae/sapphire-tower-hall-de-entrada-atualizada.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Hall</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.fgempreendimentos.com.br:2341/img/664aa6c7-01b5-4d26-a323-48c6f709deea/sapphire-tower-pinaculo-atualizada.jpg?fm=jpg&q=80&fit=max"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Pináculo</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className='copy-frame'>
        <span className='copy1'>
          Se você procura um lar que una elegância, conforto e uma localização privilegiada, a <span className='text-especial'>Sapphire Tower</span> é a escolha ideal. Este projeto exclusivo da <span className='text-especial'>FG Empreendimentos</span>, com entrega prevista para 2027, vai além de um simples imóvel; é a realização de um <span className='text-especial'>estilo de vida inigualável</span>.
        </span>
        <span className='copy2'>
          Por Que a Sapphire Tower é Incomparável?
        </span>
        <div className='topics-copy'>
          <div className="topic">
            <h1>Design Excepcional</h1>
            <h2>Apartamentos de 4 suítes a partir de 146 m², meticulosamente projetados para oferecer um ambiente sofisticado e acolhedor, perfeito para a sua família.</h2>
          </div>
          <div className="topic">
            <h1>Exclusividade em Cada Andar</h1>
            <h2>Com apenas 2 apartamentos por andar, você desfruta de privacidade e tranquilidade em um edifício imponente de 59 andares e 215 metros de altura.</h2>
          </div>
          <div className="topic">
            <h1>Lazer Sem Limites</h1>
            <h2>Desfrute de 2 andares inteiramente dedicados ao lazer e um rooftop de 2.300 m², ideal para relaxar e socializar, com vistas deslumbrantes que vão tirar o seu fôlego.</h2>
          </div>
          <div className="topic">
            <h1>Facilidade de Pagamento</h1>
            <h2>Aproveite condições excepcionais de pagamento, com a possibilidade de financiar em até 100x diretamente com a construtora. Um investimento que se encaixa perfeitamente no seu planejamento financeiro.</h2>
          </div>
        </div>
      </div>

      <div className='stage-frame'>
        <div className='title-stages'>
          <span className='title-frame-stage'>Estágio da Obra</span>
        </div>
        <div className='progress-container'>
          <label className='stage-geral-title'>Estágio Geral</label>
          <div className="progress-bar" style={{ width: `${progress}%` }}>
          {progress}%
          </div>
        </div>
        <div className='show-more-stages-div' onClick={showStages} ref={stageControls}>
          <span>VER MAIS</span>
          <i className="bi bi-chevron-compact-down" id='one-arrow-down'></i>
        </div>
        <div className='all-stages-div' ref={allStagesRef}>
          <div className='progress-container'>
            <label className='stage-geral-title'>Serviços Gerais</label>
            <div className="progress-bar" style={{ width: `${geralServicesStage}%` }}>
            {geralServicesStage}%
            </div>
          </div>
          <div className='progress-container'>
            <label className='stage-geral-title'>Estrutura</label>
            <div className="progress-bar" style={{ width: `${structureStage}%` }}>
            {structureStage}%
            </div>
          </div>
          <div className='progress-container'>
            <label className='stage-geral-title'>Vedações</label>
            <div className="progress-bar" style={{ width: `${sealingStage}%` }}>
            {sealingStage}%
            </div>
          </div>
          <div className='progress-container'>
            <label className='stage-geral-title'>Instalações</label>
            <div className="progress-bar" style={{ width: `${installationStage}%` }}>
            {installationStage}%
            </div>
          </div>
          <div className='progress-container'>
            <label className='stage-geral-title'>Revest. Argamassa</label>
            <div className="progress-bar" style={{ width: `${argamassaStage}%` }}>
            {argamassaStage}%
            </div>
          </div>
          <div className='progress-container'>
            <label className='stage-geral-title'>Elevador</label>
            <div className="progress-bar" style={{ width: `${elevatorStage}%` }}>
            {elevatorStage}%
            </div>
          </div>
          <div className='progress-container'>
            <label className='stage-geral-title'>Acabamentos</label>
            <div className="progress-bar" style={{ width: `${acabamentosStage}%` }}>
            {acabamentosStage}%
            </div>
          </div>
          <div className='progress-container'>
            <label className='stage-geral-title'>Esquadrias</label>
            <div className="progress-bar" style={{ width: `${esquadriasStage}%` }}>
            {esquadriasStage}%
            </div>
          </div>
          <div className='progress-container'>
            <label className='stage-geral-title'>Móveis e Decorações</label>
            <div className="progress-bar" style={{ width: `${moveisStage}%` }}>
            {moveisStage}%
            </div>
          </div>
        </div>
      </div>

      <div className='location-frame'>
        <div className='location-title'>
          <span className='title-location'>Localização</span>
        </div>
        <div className='location'>
        <iframe className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3555.689369292073!2d-48.6372817!3d-26.9767346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d8c9f8f66d9279%3A0x95a1e7192258f3b2!2sAv.%20Brasil%2C%20240%20-%20Centro%2C%20Balne%C3%A1rio%20Cambori%C3%BA%20-%20SC%2C%2088330-040!5e0!3m2!1spt-BR!2sbr!4v1722908745186!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

      <div className='copywrite-2'>
        <span className='write1'>
          Uma Oportunidade Única !
        </span>
        <span className='write2'>
          As unidades da <span className='link-to-register'>Sapphire Tower</span> são limitadas e a demanda é crescente. Não perca a <span className='text-especial'>chance</span> de fazer parte deste <span className='text-especial'>projeto inovador</span>. <span className='link-to-register'>Cadastre-se agora</span> e receba informações <span className='text-especial'>exclusivas</span> sobre este empreendimento que representa o auge do <span className='text-especial'>luxo</span> e da <span className='text-especial'>sofisticação</span>.
        </span>
      </div>

      <div className='contact-frame'>
        <span className='contact-title'>Entre em contato</span>
        <span className='subtitle-contact'>Preencha os dados logo abaixo para que possamos entrar em contato.</span>
        <div className='form-frame'>
          <div className='form-action'>
            <input type="text" placeholder='Nome' value={name} onChange={handleChangeName} maxLength={100} />
          </div>
          <div className='form-action'>
            <input type="text" placeholder='Email' value={email} onChange={handleChangeEmail} maxLength={100} />
          </div>
          <div className='form-action'>
            <InputMask className='masked' mask="(99) 99999-9999" maskChar={null} type="text" placeholder='Telefone' value={telefone} onChange={handleChangeTelefone} />
          </div>
          <div className='form-action'>
            <input className='inpt-tower' type="text" placeholder='Sapphire Tower' disabled />
          </div>
          <div className='form-action'>
            <select
              id="valor-investimento"
              onChange={handleValue}
              value={selectedValue}
            >
              <option value="Não informado">Valor de investimento</option>
              <option value="De 1,8 milhões até 2 milhões">De 1,8 milhões até 2 milhões</option>
              <option value="De 2 milhões até 3 milhões">De 2 milhões até 3 milhões</option>
              <option value="De 3 milhões até 5 milhões">De 3 milhões até 5 milhões</option>
            </select>
          </div>
          <div className='form-action'>
            <select
                id="tipo-investimento"
                onChange={handleType}
                value={selectedType}
              >
                <option value="Não informado">Tipo de investimento</option>
                <option value="Moradia">Moradia</option>
                <option value="Investimento">Investimento</option>
              </select>
          </div>
          <div className='form-action'>
            <span className='prefer-contact'>Selecione uma preferência de contato:</span>
            <div className='form-frame2'>
              <label className='checkboxs'>
                <input
                  type="checkbox"
                  placeholder='Preferencia de contato'
                  checked={isCheckedWpp}
                  onChange={() => handleCheck('wpp')}
                />
                <span className='title-checkbox'>WhatsApp</span>
                <div className="checkmark"></div>
              </label>

              <label className='checkboxs'>
                <input
                  type="checkbox"
                  placeholder='Preferencia de contato'
                  checked={isCheckedTel}
                  onChange={() => handleCheck('tel')}
                />
                <span className='title-checkbox'>Telefone</span>
                <div className="checkmark"></div>
              </label>

              <label className='checkboxs'>
                <input
                  type="checkbox"
                  placeholder='Preferencia de contato'
                  checked={isCheckedMail}
                  onChange={() => handleCheck('mail')}
                />
                <span className='title-checkbox'>Email</span>
                <div className="checkmark"></div>
              </label>
              <span className='submit-btn' onClick={handleSubmit}>ENVIAR</span>
              <span className='sucess-msg' ref={sucessRef}>Tudo certo ! Entraremos em contato em breve.</span>

            </div>

          </div>

        </div>
      </div>


    </div>
  )
}

export default App
