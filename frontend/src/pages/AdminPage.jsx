import {useForm,useFieldArray} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import axiosClient from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom';

const problemSchema=z.object({
  title:z.string().min(5,'Title must be at least 5 characters long'),
  description:z.string().min(20,'Description must be at least 20 characters long'),
  difficulty:z.enum(['easy','medium','hard']),
  tags:z.enum(['arrays','strings','math','dp','graphs','trees','sorting','searching']),
  visibleTestCases:z.array(
    z.object({
      input:z.string().min(1,'Input is required'),
      output:z.string().min(1,'Output is required')
    })
  ).min(1,'At least one visible test case is required'),
  hiddenTestCases:z.array(
    z.object({
      input:z.string().min(1,'Input is required'),
      output:z.string().min(1,'Output is required')
    })
  ).min(1,'At least one hidden test case is required'),

  startCode:z.array(
    z.object({
      language:z.enum(['python','javascript','java','c++']),
      code:z.string().min(1,'Start code is required')
    })
  ).length(4,'Start code for all 4 languages is required')
});

function AdminPage(){

  const navigate=useNavigate();
  const {register,control,handleSubmit,formState:{errors}}=useForm({
    resolver:zodResolver(problemSchema),
    defaultValues:{
      title:'',
      description:'',
      difficulty:'easy',
      tags:'arrays',
      visibleTestCases:[{input:'',output:''}],
      hiddenTestCases:[{input:'',output:''}],
      startCode:[]
    }
  });


  const {
    field: visibleFields,
    append: appendVisible,
    remove: removeVisible
  }=useFieldArray({
    control,
    name:'visibleTestCases'
  });

  const {
    field: hiddenFields,
    append: appendHidden,
    remove: removeHidden
  }=useFieldArray({
    control,
    name:'hiddenTestCases'
  }
);

const onSubmit=async(data)=>{
  try{
    await axiosClient.post('/api/auth/problem/createProblem',data);
    alert('Problem added successfully');
    navigate('/');
  }catch(error){
    console.error('Error adding problem:',error);
    alert('Failed to add problem');
  }
};

  return(
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Create New Problem</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div className='card bg-base-100 shadow-lg p-6'>
          <h2 className='text-xl font-semibold mb-4'>
            Basic Information
          </h2>
          <div className='space-y-4'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Title</span>
              </label>
              <input
              {...register('title')}
              type='text'
              className={`input input-bordered ${errors.title && 'input-error' }`}
              />
              {errors.title && (<span className='text-error'>{errors.title.message}</span>)}
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Description</span>
              </label>
              <textarea
              {...register('description')}
              className={`textarea textarea-bordered h-32 ${errors.description && 'textarea-error' }`}
              rows={5}
              />
              {errors.description && (<span className='text-error'>{errors.description.message}</span>)}
            </div>

            <div className='flex gap-4'>
              <div className='form-control w-1/2'>
                <label className='label'>
                  <span className='label-text'>Difficulty</span>
                </label>
                <select
                {...register('difficulty')}
                className={`select select-bordered ${errors.difficulty && 'select-error' }`}
                >
                  <option value='easy'>Easy</option>
                  <option value='medium'>Medium</option>
                  <option value='hard'>Hard</option>
                </select>
              </div>

              <div className='form-control w-1/2'>
                <label className='label'>
                  <span className='label-text'>Tag</span>
                </label>
                <select
                {...register('tags')}
                className={`select select-bordered ${errors.tags && 'select-error' }`}
                >
                  <option value='arrays'>Arrays</option>
                  <option value='strings'>Strings</option>
                  <option value='math'>Math</option>
                  <option value='dp'>Dynamic Programming</option>
                  <option value='graphs'>Graphs</option>
                  <option value='trees'>Trees</option>
                  <option value='sorting'>Sorting</option>
                  <option value='searching'>Searching</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Additional form sections for test cases and start code can be added here */}

        <div className='card bg-base-100 shadow-lg p-6'>
          <h2 className='text-xl font-semibold mb-4'>Text Cases</h2>

          {/* Visible Test Cases Section */}

          <div className='space-y-4 mb-6'>
            <div className='flex justify-between items-center'>
              <h3 className='font-medium'>Visible Test Cases</h3>
              <button
              type='button'
              onClick={()=>appendVisible({input:'',output:'',explanation:''})}
              className='btn btn-primary btn-sm'
              >
                Add Visible Test Case
              </button>
            </div>
            {visibleFields.map((field,index)=>(
              <div key={field.id} className='border p-4 rounded-lg space-y-2'>
                <div className='flex justify-end'>
                  <button
                  type='button'
                  onClick={()=>removeVisible(index)}
                  className='btn btn-error btn-sm'
                  >
                    Remove
                  </button>
                </div>

                <input
                {...register(`visibleTestCases.${index}.input`)}
                placeholder='Input'
                className="input input-bordered w-full"
                />

                <input 
                {...register(`visibleTestCases.${index}.output`)} 
                className='input input-bordered w-full'
                placeholder='output' 
                />

                <textarea
                {...register(`visibleTestCases.${index}.explanation`)}
                className='textarea textarea-bordered w-full'
                placeholder='Explanation (optional)'
                />
              </div>
            ))}
          </div>

          {/* Hidden Test Cases Section */}
          <div className='space-y-4'>
            <div className='felx justify-between items-center'>
              <h3 className='font-medium'>Hidden Test Cases</h3>
              <button
              type='button'
              onClick={()=>appendHidden({input:'',output:''})}
              className='btn btn-primary btn-sm'
              >
                Add Hidden Test Case
              </button>
            </div>

            {hiddenFields.map((field,index)=>(
              <div key={field.id} className='border p-4 rounded-lg space-y-2'>
                <div className='flex justify-end'>
                  <button
                  type='button'
                  onClick={()=>removeHidden(index)}
                  className='btn btn-error btn-sm'
                  >
                    Remove
                  </button>
                </div>

                <input
                {...register(`hiddenTestCases.${index}.input`)}
                placeholder='Input'
                className="input input-bordered w-full"
                />

                <input 
                {...register(`hiddenTestCases.${index}.output`)} 
                className='input input-bordered w-full'
                placeholder='output' 
                />
              </div>
            ))}
          </div>
        </div>

        {/*code template section can be added here */}

        <div className='card bg-base-100 shadow-lg p-6'>
          <h2 className='text-xl font-semibold mb-4'>Starter Code</h2>
          <div className='space-y-6'>
            {[0,1,2].map((index)=>(
              <div key={index} className='space-y-2'>
                <h3 className='font-medium'>
                  {index === 0 ? 'c++' : index === 1 ? 'Java' : 'JavaScript'}
                </h3>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Initial Code</span>
                  </label>
                  <pre className='bg-base-300 p-4 rounded-lg'>
                    <textarea 
                    {...register(`startCode.${index}.code`)}
                    className='w-full bg-transparent font-mono'
                    rows={6}
                    />
                  </pre>
                </div> 
              </div>
            ))}
          </div>
        </div>

        <button className='btn btn-primary w-full'>Create Problem</button>
      </form>
    </div>
  )
}

export default AdminPage;