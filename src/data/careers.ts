import type { CareerPath } from '../types'

export const careerPaths: CareerPath[] = [
  {
    id: '1',
    area: 'Dados & BI',
    marketDemand: 'Muito Alta',
    avgTimeToSenior: '4-6 anos',
    description: 'Carreira em alta demanda com múltiplas especializações: Analytics Engineering, Data Engineering, BI e Analytics. Forte atuação em decisões estratégicas de negócio.',
    stages: [
      {
        level: 'Estágio',
        avgSalary: 2800,
        yearsExp: '0 anos',
        topSkills: ['SQL básico', 'Excel', 'Python básico', 'Power BI'],
        description: 'Suporte às equipes de dados, criação de relatórios básicos e aprendizado de ferramentas.',
      },
      {
        level: 'Júnior',
        avgSalary: 6000,
        yearsExp: '0-2 anos',
        topSkills: ['SQL avançado', 'Python', 'Power BI', 'ETL básico', 'Storytelling com dados'],
        description: 'Construção de pipelines básicos, dashboards e análises orientadas a negócio.',
      },
      {
        level: 'Pleno',
        avgSalary: 12000,
        yearsExp: '2-4 anos',
        topSkills: ['Python', 'dbt', 'Airflow', 'Spark', 'SQL avançado', 'Cloud (AWS/GCP/Azure)'],
        description: 'Autonomia na construção de pipelines complexos, modelagem de dados e arquiteturas.',
      },
      {
        level: 'Sênior',
        avgSalary: 22000,
        yearsExp: '4-7 anos',
        topSkills: ['Databricks', 'Arquitetura de dados', 'dbt', 'Kafka', 'Liderança técnica'],
        description: 'Design de arquiteturas de dados, mentoria de juniors e decisões técnicas estratégicas.',
      },
      {
        level: 'Especialista',
        avgSalary: 35000,
        yearsExp: '7+ anos',
        topSkills: ['Data Architecture', 'Data Mesh', 'Data Governance', 'Cloud Design', 'Liderança'],
        description: 'Referência técnica, define padrões e estratégias de dados para a organização.',
      },
    ],
  },
  {
    id: '2',
    area: 'Inteligência Artificial',
    marketDemand: 'Muito Alta',
    avgTimeToSenior: '4-7 anos',
    description: 'A carreira mais aquecida do momento. Abrange desde modelos tradicionais de ML até LLMs e IA Generativa. Alta escassez de profissionais, salários acima da média.',
    stages: [
      {
        level: 'Estágio',
        avgSalary: 3200,
        yearsExp: '0 anos',
        topSkills: ['Python', 'Matemática', 'Estatística básica', 'Scikit-learn'],
        description: 'Pesquisa e experimentação com modelos básicos, suporte a projetos de ML.',
      },
      {
        level: 'Júnior',
        avgSalary: 7500,
        yearsExp: '0-2 anos',
        topSkills: ['Python', 'PyTorch/TF', 'Pandas', 'SQL', 'MLflow', 'Estatística'],
        description: 'Treinamento de modelos supervisionados, EDA e preparação de features.',
      },
      {
        level: 'Pleno',
        avgSalary: 15000,
        yearsExp: '2-4 anos',
        topSkills: ['PyTorch', 'MLflow', 'Feature Engineering', 'Modelos avançados', 'Cloud ML', 'Docker'],
        description: 'Projetos de ponta a ponta: da concepção ao deploy de modelos em produção.',
      },
      {
        level: 'Sênior',
        avgSalary: 27000,
        yearsExp: '4-7 anos',
        topSkills: ['LLMs', 'MLOps', 'Kubernetes', 'Research', 'Liderança', 'Arquitetura ML'],
        description: 'Pesquisa aplicada, arquitetura de sistemas ML e liderança de projetos complexos.',
      },
      {
        level: 'Especialista',
        avgSalary: 42000,
        yearsExp: '7+ anos',
        topSkills: ['LLMs Fine-tuning', 'IA Generativa', 'Research', 'Publicações', 'Estratégia de IA'],
        description: 'Referência em IA, define estratégia de adoção e pesquisa de ponta na organização.',
      },
    ],
  },
  {
    id: '3',
    area: 'Machine Learning',
    marketDemand: 'Muito Alta',
    avgTimeToSenior: '4-6 anos',
    description: 'Foco em colocar modelos em produção de forma robusta e escalável. Intersecção entre Data Science, Engenharia de Software e DevOps. MLOps é a especialização mais valorizada.',
    stages: [
      {
        level: 'Júnior',
        avgSalary: 8000,
        yearsExp: '0-2 anos',
        topSkills: ['Python', 'Docker', 'MLflow', 'Scikit-learn', 'APIs REST'],
        description: 'Deploy básico de modelos, versionamento e monitoramento inicial.',
      },
      {
        level: 'Pleno',
        avgSalary: 16000,
        yearsExp: '2-4 anos',
        topSkills: ['Kubernetes', 'MLflow', 'FastAPI', 'Feature Store', 'CI/CD para ML'],
        description: 'Implementação de pipelines MLOps completos e sistemas de monitoramento de modelos.',
      },
      {
        level: 'Sênior',
        avgSalary: 28000,
        yearsExp: '4-7 anos',
        topSkills: ['Arquitetura MLOps', 'Cloud ML', 'Multi-model', 'Platform Engineering', 'Liderança'],
        description: 'Plataformas de ML completas, definição de padrões e escala de sistemas de ML.',
      },
      {
        level: 'Especialista',
        avgSalary: 40000,
        yearsExp: '7+ anos',
        topSkills: ['ML Platform', 'LLMOps', 'Real-time ML', 'Governança de Modelos'],
        description: 'Arquiteto de plataformas ML, define estratégia técnica de toda a operação de modelos.',
      },
    ],
  },
  {
    id: '4',
    area: 'DevOps & Cloud',
    marketDemand: 'Alta',
    avgTimeToSenior: '3-5 anos',
    description: 'Essencial em toda organização moderna. Abrange automação de infraestrutura, CI/CD, containers e cloud. Cada vez mais convergente com MLOps e Platform Engineering.',
    stages: [
      {
        level: 'Júnior',
        avgSalary: 7000,
        yearsExp: '0-2 anos',
        topSkills: ['Linux', 'Docker', 'Git', 'CI/CD básico', 'Shell Script'],
        description: 'Suporte à infraestrutura, automação de tarefas e aprendizado de cloud.',
      },
      {
        level: 'Pleno',
        avgSalary: 14000,
        yearsExp: '2-4 anos',
        topSkills: ['Kubernetes', 'Terraform', 'AWS/Azure/GCP', 'Ansible', 'Monitoring'],
        description: 'Gestão de clusters Kubernetes, IaC e pipelines CI/CD robustos.',
      },
      {
        level: 'Sênior',
        avgSalary: 23000,
        yearsExp: '4-6 anos',
        topSkills: ['Multi-cloud', 'FinOps', 'Platform Engineering', 'Security', 'Arquitetura'],
        description: 'Arquitetura cloud, otimização de custos e liderança técnica de infraestrutura.',
      },
      {
        level: 'Especialista',
        avgSalary: 34000,
        yearsExp: '6+ anos',
        topSkills: ['Platform as a Product', 'FinOps', 'Chaos Engineering', 'SRE avançado'],
        description: 'Principal Engineer ou Platform Architect, define standards para toda a engenharia.',
      },
    ],
  },
]

export const demandByArea = [
  { area: 'IA Generativa', demand: 98, growth: 180 },
  { area: 'ML Engineering', demand: 92, growth: 65 },
  { area: 'Data Engineering', demand: 90, growth: 45 },
  { area: 'MLOps', demand: 88, growth: 58 },
  { area: 'DevOps / SRE', demand: 85, growth: 30 },
  { area: 'Analytics Engineering', demand: 82, growth: 40 },
  { area: 'Data Science', demand: 80, growth: 35 },
  { area: 'BI / Analytics', demand: 75, growth: 15 },
  { area: 'Backend', demand: 78, growth: 20 },
  { area: 'Segurança', demand: 72, growth: 25 },
]

// Alias for useApi compatibility
export const careers = careerPaths;
