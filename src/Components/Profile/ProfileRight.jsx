import style from './Profile.module.css'

export default function ProfileRight() {

  const statistics = [
    { name: "Chapter 1", id: '00', Progress: '50', secoundcolor: '#F0F9FF', color: '#0095FF' },
    { name: "Chapter 2", id: '01', Progress: '70', secoundcolor: '#F0FDF4', color: '#00E58F' },
    { name: "Chapter 3", id: '02', Progress: '30', secoundcolor: '#FBF1FF', color: '#884DFF' },
    { name: "Chapter 4", id: '03', Progress: '30', secoundcolor: '#FEF6E6', color: '#FF8900' },
    { name: "Chapter 4", id: '04', Progress: '30', secoundcolor: '#FA8C8C', color: '#E91D29' },
  ]


  return (
    <section className={`${style.ProfileLeft__box} col-lg-7 col-sm-12`}>

      <select className="form-select w-sm-50 w-25 mx-auto" aria-label="Default select example">
        <option defaultValue={"Chemistry"}>Chemistry</option>
        <option value="Math">Math</option>
        <option value="English">English</option>
      </select>

      <div className='row mt-4 mb-3 w-100 p-3 border-bottom d-md-flex d-none fw-light small' style={{ color: '#96A5B8' }}>
        <h6 className="fw-lighter col-1">#</h6>
        <h6 className="fw-lighter col-4">Chapters</h6>
        <h6 className="fw-lighter col-5">Progress</h6>
        <h6 className="fw-lighter col-2">Percentage</h6>
      </div>


      {statistics.map((el, index) =>

        <div key={index} className='row mt-4 mb-3 w-100 px-3 justify-content-between border-bottom align-items-baseline'>
          <h6 className="fw-semibold mb-sm-0 mb-2 col-md-1 col-6 text-body-secondary" style={{ height: '70px' }}>{el.id}</h6>
          <h6 className="fw-semibold mb-sm-0 mb-2 col-md-4 col-6 text-end text-md-start" style={{ height: '70px' }}>{el.name}</h6>

          <div className="fw-semibold mb-sm-0 mb-2 col-md-5 col-6" style={{ height: '70px' }}>
            <div className="progress" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{ height: '10px' }}>
              <div className="progress-bar" style={{ width: `${el.Progress}%`, backgroundColor: `${el.color}` }}></div>
            </div>
          </div>

          <div className={`${style.ProfileRight_Percentage} mb-sm-0 mb-2 col-md-2 col-6`} style={{ backgroundColor: '#F0F9FF', border: `2px solid ${el.color}`, color: `${el.color}`, height: '70px' }}>
            <h6 className='fw-semibold m-0'>{el.Progress}%</h6>
          </div>
        </div>

      )}

    </section>
  )
}
