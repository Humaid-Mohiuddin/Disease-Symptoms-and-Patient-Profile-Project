const diseases = ['Influenza',
    'Common Cold',
    'Eczema',
    'Asthma',
    'Hyperthyroidism',
    'Allergic Rhinitis',
    'Anxiety Disorders',
    'Diabetes',
    'Gastroenteritis',
    'Pancreatitis',
    'Rheumatoid Arthritis',
    'Depression',
    'Liver Cancer',
    'Stroke',
    'Urinary Tract Infection',
    'Dengue Fever',
    'Hepatitis',
    'Kidney Cancer',
    'Migraine',
    'Muscular Dystrophy',
    'Sinusitis',
    'Ulcerative Colitis',
    'Bipolar Disorder',
    'Bronchitis',
    'Cerebral Palsy',
    'Colorectal Cancer',
    'Hypertensive Heart Disease',
    'Multiple Sclerosis',
    'Myocardial Infarction (Heart...',
    'Urinary Tract Infection (UTI)',
    'Osteoporosis',
    'Pneumonia',
    'Atherosclerosis',
    'Chronic Obstructive Pulmonary...',
    'Epilepsy',
    'Hypertension',
    'Obsessive-Compulsive Disorde...',
    'Psoriasis',
    'Rubella',
    'Cirrhosis',
    'Conjunctivitis (Pink Eye)',
    'Liver Disease',
    'Malaria',
    'Spina Bifida',
    'Kidney Disease',
    'Osteoarthritis',
    'Klinefelter Syndrome',
    'Acne',
    'Brain Tumor',
    'Cystic Fibrosis',
    'Glaucoma',
    'Rabies',
    'Chickenpox',
    'Coronary Artery Disease',
    'Eating Disorders (Anorexia,...',
    'Fibromyalgia',
    'Hemophilia',
    'Hypoglycemia',
    'Lymphoma',
    'Tuberculosis',
    'Lung Cancer',
    'Hypothyroidism',
    'Autism Spectrum Disorder (ASD)',
    "Crohn's Disease",
    'Hyperglycemia',
    'Melanoma',
    'Ovarian Cancer',
    'Turner Syndrome',
    'Zika Virus',
    'Cataracts',
    'Pneumocystis Pneumonia (PCP)',
    'Scoliosis',
    'Sickle Cell Anemia',
    'Tetanus',
    'Anemia',
    'Cholera',
    'Endometriosis',
    'Sepsis',
    'Sleep Apnea',
    'Down Syndrome',
    'Ebola Virus',
    'Lyme Disease',
    'Pancreatic Cancer',
    'Pneumothorax',
    'Appendicitis',
    'Esophageal Cancer',
    'HIV/AIDS',
    'Marfan Syndrome',
    "Parkinson's Disease",
    'Hemorrhoids',
    'Polycystic Ovary Syndrome (PCOS)',
    'Systemic Lupus Erythematosus...',
    'Typhoid Fever',
    'Breast Cancer',
    'Measles',
    'Osteomyelitis',
    'Polio',
    'Chronic Kidney Disease',
    'Hepatitis B',
    'Prader-Willi Syndrome',
    'Thyroid Cancer',
    'Bladder Cancer',
    'Otitis Media (Ear Infection)',
    'Tourette Syndrome',
    "Alzheimer's Disease",
    'Chronic Obstructive Pulmonary Disease (COPD)',
    'Dementia',
    'Diverticulitis',
    'Mumps',
    'Cholecystitis',
    'Prostate Cancer',
    'Schizophrenia',
    'Gout',
    'Testicular Cancer',
    'Tonsillitis',
    'Williams Syndrome']

function populateDiseases() {
    // Sort diseases alphabetically
    diseases.sort();

    const select = document.getElementById('disease');
    diseases.forEach(disease => {
        const option = document.createElement('option');
        option.textContent = disease;
        option.value = disease;
        select.appendChild(option);
    });
}

window.onload = populateDiseases;



document.getElementById('prediction-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const jsonData = {};

    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('prediction-result').textContent = `Outcome: ${data.prediction}`;
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('theme-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
});