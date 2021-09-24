import test from 'japa'
import { chunkSubstr } from './TgSender'
const log = require('debug')('TEST')
test.group('TgSender.spec', (group) => {
  test('ChunkSmallText', async (assert) => {
    const res = chunkSubstr('hasda hasasf asdasd', 1000)
    console.log('res', res)
    assert.equal(res.length, 1)
  })
  test('ChunkLongText', async (assert) => {
    const res = chunkSubstr(
      'hasda hasasf asdassdsdfj lsjdfsdjflj sldjflsjdflsj lsdjflsjdflsjdlfjslj sdljflsdjfsddewrwperi3458eufert83ujv uerueksdfj99df3ij3eofu3o4jef9werwjefs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\ndfs8tjerfjsfj lfjsdlfs8dfijrt3e8werlwf\nwerjwer\nd',
      1000
    )
    console.log('res', res, res[0].length)
    assert.equal(res[0].length, 1000)
    assert.equal(res.length, 2)
  })
})
