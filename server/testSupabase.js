import supabase from './config/supabase.js'

const { data, error } = await supabase
  .from('tickets')
  .select('*')

if (error) {
  console.error('❌ Supabase connection failed:')
  console.error(error)
} else {
  console.log('✅ Supabase connection successful!')
  console.log('Tickets:', data)
}